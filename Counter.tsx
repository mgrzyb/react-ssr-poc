import {useCallback, useState} from "react";

export const Counter = ({ counter }: { counter: { initialValue: number, step: number }}) => {
    const [value, setValue] = useState(counter.initialValue);

    const clickHandler = useCallback(() => setValue(v => v+counter.step), [counter.step]);
    
    return (
            <div>
                <span>{value}</span>
                <button onClick={clickHandler}>+1</button>
            </div>)
}