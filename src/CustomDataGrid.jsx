import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

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

export default function CustomDataGrid() {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 60 },
    { field: "player", headerName: "Player", flex: 1, minWidth: 150 },
    { field: "team", headerName: "Team", flex: 1, minWidth: 120 },
    { field: "runs", headerName: "Runs", flex: 1, minWidth: 100 },
    { field: "matches", headerName: "Matches", flex: 1, minWidth: 100 },
    { field: "strikeRate", headerName: "SR", flex: 1, minWidth: 100 },
  ];

  // 🔥 More rows to trigger virtualization issues
  const rows = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    player: `Player ${i + 1}`,
    team: i % 2 === 0 ? "India" : "Australia",
    runs: Math.floor(Math.random() * 500),
    matches: Math.floor(Math.random() * 20),
    strikeRate: (Math.random() * 200).toFixed(2),
  }));

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" textAlign="center" sx={{ py: 2 }}>
        🧪 Safari DataGrid Bug Reproduction
      </Typography>

      {/* 👇 Flex + 100% height chain */}
      <Box sx={{ flex: 1 }}>
        <FakeScrollbar>
          <DataGrid
            autoHeight // ❌ KEY PROBLEM
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            
            // ❌ Dynamic height makes Safari worse
            getRowHeight={() => "auto"}

            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
              },
            }}
          />
        </FakeScrollbar>
      </Box>
    </Box>
  );
}