import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

function App() {
const columns = [
  { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 60 },
  { field: 'player', headerName: 'Player', flex: 1, minWidth: 120 },
  { field: 'team', headerName: 'Team', flex: 1, minWidth: 100 },
  { field: 'runs', headerName: 'Runs', flex: 1, minWidth: 90 },
  { field: 'matches', headerName: 'Matches', flex: 1, minWidth: 90 },
  { field: 'strikeRate', headerName: 'SR', flex: 1, minWidth: 90 },
]

  const rows = [
    { id: 1, player: 'Sahibzada Farhan', team: 'Pakistan', runs: 383, matches: 6, strikeRate: 160.25 },
    { id: 2, player: 'Tim Seifert', team: 'New Zealand', runs: 326, matches: 8, strikeRate: 166.33 },
    { id: 3, player: 'Sanju Samson', team: 'India', runs: 321, matches: 5, strikeRate: 180.0 },
    { id: 4, player: 'Ishan Kishan', team: 'India', runs: 317, matches: 9, strikeRate: 145.0 },
    { id: 5, player: 'Finn Allen', team: 'New Zealand', runs: 298, matches: 8, strikeRate: 200.0 },
  ]

  return (
    <Box >
      <Typography variant="h5" textAlign="center" sx={{ py: 2 }}>
        🏏 T20 World Cup 2026 - Top Batters
      </Typography>


  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
  />

    </Box>
  )
}

export default App