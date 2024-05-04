import './App.css'

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Layout from "./components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const THEME = createTheme({
	typography: {
		fontFamily: `"Lexend", "Helvetica", "Arial", sans-serif`,
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
	},
});

function App() {
	return (
		<ThemeProvider theme={THEME}>
			<Layout>
				<Stack spacing={2} direction="row">
					<Button variant="text">Text</Button>
					<Button variant="contained">Contained</Button>
					<Button variant="outlined">Outlined</Button>
				</Stack>
			</Layout>
		</ThemeProvider>
	);
}

export default App
