import { DataGrid } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

function App() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'player', headerName: 'Player', width: 180 },
    { field: 'team', headerName: 'Team', width: 120 },
    { field: 'runs', headerName: 'Runs', width: 100 },
    { field: 'matches', headerName: 'Matches', width: 100 },
    { field: 'strikeRate', headerName: 'SR', width: 100 },
  ]

  const rows = [
    { id: 1, player: 'Sahibzada Farhan', team: 'Pakistan', runs: 383, matches: 6, strikeRate: 160.25 },
    { id: 2, player: 'Tim Seifert', team: 'New Zealand', runs: 326, matches: 8, strikeRate: 166.33 },
    { id: 3, player: 'Sanju Samson', team: 'India', runs: 321, matches: 5, strikeRate: 180.0 },
    { id: 4, player: 'Ishan Kishan', team: 'India', runs: 317, matches: 9, strikeRate: 145.0 },
    { id: 5, player: 'Finn Allen', team: 'New Zealand', runs: 298, matches: 8, strikeRate: 200.0 },
  ]

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',   // horizontal center
        alignItems: 'center',       // vertical center
      }}
    >
      <Box sx={{ width: '70%', maxWidth: 800 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          🏏 T20 World Cup 2026 - Top Batters
        </Typography>

        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default App