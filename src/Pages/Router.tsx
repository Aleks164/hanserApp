import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import TabTables from "@/Pages/TabTables";
import Diagrams from "@/Pages/Diagrams";
import ProductCards from "./Cards";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TabTables />} />
        <Route path="diagrams" element={<Diagrams />} />
        <Route path="cards" element={<ProductCards />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default Router;
