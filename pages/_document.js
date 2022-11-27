import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="zxx">
                <Head>
                    <link rel="icon" href="https://res.cloudinary.com/dev-empty/image/upload/v1589823195/favicon.ico" type="image/x-icon" />
                    <meta name="theme-color" content="#00df94" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;