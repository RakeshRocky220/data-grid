import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Home from "./Home";
import CustomDataGrid from "./CustomDataGrid";
import { Link,Routes,Route } from "react-router-dom";
/**
 * Fake Scrollbar (simulates your custom Scrollbar / simplebar)
 */
const FakeScrollbar = ({ children }) => {
  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default function App() {
 return  <div>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/data-grid">Data Grid</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-grid" element={<CustomDataGrid />} />
      </Routes>
    </div>
}