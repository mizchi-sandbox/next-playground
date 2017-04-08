require('isomorphic-fetch')
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import Link from 'next/link'
import Router from 'next/router'

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const {html, head} = renderPage()
    const styles = flush()
    // await wait(150)
    return { html, head, styles }
  }

  render () {
    return (
     <html>
       <Head>
         <style>{`body { margin: 0 } /* custom! */`}</style>
       </Head>
       <body className="custom_class">
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}

// Router.onRouteChangeStart = (url) => {
//   console.log('aaa', url)
//   return true
// }
