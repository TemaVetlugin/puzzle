import React from "react";
import Page from "./home/page";
import { AppProps } from 'next/app';
import Head from 'next/head';

import './home/page.scss';
import '../shared/ui/UiTextarea/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Мое приложение</title>
                <meta name="description" content="Описание моего приложения" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;