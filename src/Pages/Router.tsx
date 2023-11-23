import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import TabTables from "@/Pages/TabTables";
import Diagrams from "@/Pages/Diagrams";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TabTables />} />
        <Route path="diagrams" element={<Diagrams />} />
        <Route path="*" element={<TabTables />} />
      </Route>
    </Routes>
  );
}

export default Router;
