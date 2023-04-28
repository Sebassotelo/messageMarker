import "@/styles/globals.css";
import Context from "@/services/context";
import Layout from "@/componente/layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Context>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context>
  );
}
