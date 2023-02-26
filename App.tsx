import {Article, ArticleProps} from "./Article";
import {Counter} from "./Counter";

export const App = (props : { counter : { initialValue : number, step: number}, article : ArticleProps }) => (
        <>
            <h1>Hello from React</h1>
            <Article article={props.article} />
            <Counter counter={props.counter} />
            <span>{props.article.title}</span>
        </>);