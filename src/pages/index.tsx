// https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress
import { type NextPage } from "next";

import Layout from "@components/Layout";
import Seo from "@components/Seo";

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo
        title="Academia Dahilmar Saez"
        description="Academia Dahilmar Saez"
      />

      <p>Hola Mundo</p>
    </Layout>
  );
};

export default Home;
