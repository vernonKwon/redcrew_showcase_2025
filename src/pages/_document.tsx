import { Html, Head, Main, NextScript } from 'next/document'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Document from 'next/document'
import type { DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache()
    const originalRenderPage = ctx.renderPage
    
    const enhancedCtx = {
      ...ctx,
      renderPage: () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            (
              <StyleProvider cache={cache}>
                <App {...props} />
              </StyleProvider>
            ),
        })
    }

    const initialProps = await Document.getInitialProps(enhancedCtx)
    const style = extractStyle(cache, true)
    
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
          <meta name="theme-color" content="#ff4444" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
