import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ErrorOverlay from "./ErrorOverlay";
import Scrollbar from "./Scrollbar";
import CustomPagination from "./CustomPagination";
import {
  Box,

} from "@mui/material";
const CustomDataGrid = ({
  columns,
  rowCount,
  rows,
  paginationModel,
  setPaginationModel,
  isError,
  pageSizeOptions = [10, 25, 50, 75, 100],
  extraStyles = {},
  lastEvaluatedKey = "",
  loading = false,
  total = 0,
  ErrorOverlayMsg = null,
  paginationMode = "server",
  ...restProps
}) => {
  // ✅ fallback state for standalone testing
  const [localPaginationModel, setLocalPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // ✅ Hardcoded test columns (only used if none passed)
  const testColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },
  ];

  // ✅ Hardcoded test rows (simulate large + variable height content)
  const testRows = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: i % 2 === 0 ? "Electronics" : "Clothing",
    price: `$${(Math.random() * 100).toFixed(2)}`,
    description:
      i % 3 === 0
        ? "This is a very long description to simulate dynamic row height behavior in the grid. It should wrap into multiple lines and increase row height."
        : "Short desc",
  }));

  // ✅ Use passed props OR fallback test data
  const finalColumns = columns ?? testColumns;
  const finalRows = rows ?? testRows;
  const finalPaginationModel = paginationModel ?? localPaginationModel;
  const finalSetPaginationModel =
    setPaginationModel ?? setLocalPaginationModel;
  const finalRowCount = rowCount ?? testRows.length;
  const finalTotal = total || testRows.length;

  return (
    <Box p={3}>
      <Scrollbar
        sx={{
          height: 1,
          "& .simplebar-content": {
            height: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <DataGrid
          autoHeight
          loading={loading}
          rowCount={finalRowCount}
          columns={finalColumns}
          disableColumnResize
          rows={finalRows}
          pageSizeOptions={pageSizeOptions}
          disableColumnMenu
          sortingOrder={["desc", "asc"]}
          disableRowSelectionOnClick
          paginationMode={paginationMode}
          paginationModel={finalPaginationModel}
          onPaginationModelChange={finalSetPaginationModel}
          slots={{
            noRowsOverlay: ErrorOverlay,
            noResultsOverlay: ErrorOverlay,
            pagination: CustomPagination,
          }}
          slotProps={{
            noRowsOverlay: {
              message: isError
                ? "Server failed to load data"
                : ErrorOverlayMsg,
            },
            noResultsOverlay: {
              message:
                finalRows?.length > 0
                  ? null
                  : "Your search returned no results",
            },
            pagination: {
              paginationModel: finalPaginationModel,
              setPaginationModel: finalSetPaginationModel,
              lastEvaluatedKey,
              loading,
              rows: finalRows,
              total: finalTotal,
            },
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "primary.lighter",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "primary.lighter",
            },
            "& .MuiDataGrid-columnHeader .MuiDataGrid-sortButton": {
              backgroundColor: "unset",
              opacity: "1 !important",
            },
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },
            "& .MuiDataGrid-cell": {
              border: 1,
              borderTop: 0,
              borderRight: 0,
              borderLeft: 0,
              borderColor: "grey.300",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              alignContent: "center",
            },
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
              {
                outline: "none",
              },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              height: "6px",
            },
            "&:hover": {
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                backgroundColor: "lightGray",
                borderRadius: "6px",
              },
            },
            ...extraStyles,
          }}
          {...restProps}
        />
      </Scrollbar>
    </Box>
  );
};

export default CustomDataGrid;