import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

async function mountApp() {
    //개발환경일떄만 service worker 실행
    if (process.env.NODE_ENV === "development") {
        const { worker } = require("./mock/browser");
        await worker.start(); //msw 시작
    }

    const root = ReactDOM.createRoot(
        document.getElementById("root") as HTMLElement
    );
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

mountApp();
//이렇게 하는 이유는 기존 방식을 사용했을 때
//msw가 실행되기전에 root부분이 실행되버리기 때문에 오류가 발생해버린다.
//그래서 비동기 처리를 통해 타이밍이슈를 해결
