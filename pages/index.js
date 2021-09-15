import React, { useState } from "react";
import { Page, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import store from "store-js";
import ProductList from "../components/ProductList";

const Index = () => {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");

  const handleSelection = (resources) => {
    console.log("hre", resources);
    const idsFromResources = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set("ids", idsFromResources);
    console.log("ids", store.get("ids"));
  };
  const img =
    "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";
  return (
    <Page>
      <ResourcePicker // Resource picker component
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setModal({ open: false })}
      />
      {emptyState ? (
        <Layout>
          <EmptyState
            heading="Select product to display it here"
            action={{
              content: "Select Product",
              onAction: () => setModal({ open: true }),
            }}
            image={img}
          ></EmptyState>
        </Layout>
      ) : (
        <ProductList />
      )}
    </Page>
  );
};

export default Index;
