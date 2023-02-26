import {serverSideOnly} from "./foo";
export type ArticleProps = { title: string, content: string };

export const Article = serverSideOnly(({ article } : { article: ArticleProps }) => (
        <article>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
        </article>
        ));