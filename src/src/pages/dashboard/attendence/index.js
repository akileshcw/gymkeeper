import React from "react";
import { Layout } from "src/layouts/dashboard";
import { Search } from "src/sections/components/forms/searchbar";

const index = () => {
  return (
    <>
      <Layout>
        <Search />
      </Layout>
    </>
  );
};

export default index;
