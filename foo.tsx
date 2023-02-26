const proxyCache = Symbol("ProxyCache");
const accessMarks = Symbol("AccessMarks");

export function serverSideOnly(c : (props : any) => any) {
    if (typeof window !== "undefined")
        return () => (
            <div
                dangerouslySetInnerHTML={{ __html: "" }}
                suppressHydrationWarning />);

    return (props: any) => withAccessTrackingDisabled(() => <div>{c(props)}</div>);
}

export function trimmed(o : any) {
    if (o === null || o === undefined || typeof o !== "object")
        return o;

    const accessed = o[accessMarks];
    return withAccessTrackingDisabled(() => {
        const r = {};
        for(const p in o) {
            if (accessed && accessed[p]) {
                r[p] = trimmed(o[p])
            }
        }
        return r;
    });
}

export function trackAccess(o) {
    return new Proxy(o, createProxy());
}

let accessIgnored = 0;

function withAccessTrackingDisabled(f : () => any) {
    accessIgnored++;
    try {
        return f();
    } finally {
        accessIgnored--;
    }
}

function createProxy<T>() {
    return {
        get(target : T, property: keyof T) : any {
            if (accessIgnored === 0) {
                const access = (target as any)[accessMarks] ?? ((target as any)[accessMarks] = {} as any);
                access[property] = true;
            }

            const value = target[property];

            if (property === proxyCache || property === accessMarks)
                return value;

            if (value === null || value === undefined)
                return value;

            if (typeof value !== "object")
                return value;

            const cache = (target as any)[proxyCache] ?? ((target as any)[proxyCache] = {} as T);
            return cache[property] ?? (cache[property] = new Proxy(target[property] as any, createProxy()));
        }
    }
}