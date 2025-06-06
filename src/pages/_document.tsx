import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
        </Head>
        <body style={{ fontFamily: "'Poppins', sans-serif" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
