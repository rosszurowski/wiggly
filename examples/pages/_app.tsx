import Head from "next/head"
import "../index.css"

export default function App({ Component, pageProps }) {
  return (
    <div className="p-8">
      <Head>
        <title>Wiggly</title>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
