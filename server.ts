import express, { Request, Response } from "express";
import React from "react";
import * as ReactDOMServer from 'react-dom/server';
import fs from "fs";

import { App } from "./App";
import {trackAccess, trimmed} from "./foo";

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', async (req : Request, res : Response) => {
    const props = {
        counter: { initialValue: 10, step: 2 },
        article: { title: "My first article", content: fs.readFileSync('./loremipsum.txt').toString() }
    };
    
    const html = ReactDOMServer.renderToString(React.createElement(App, trackAccess(props)));

    res.send(`<html><head></head><body><div id="app">${html}</div><script>window.initialState = ${JSON.stringify(trimmed(props))}</script><script src="http://localhost:1234/client.js"></script></body></html>`);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});