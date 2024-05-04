import './App.css'

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Layout from "./components/Layout";

function App() {
  

  return (
		<Layout>
			<Stack spacing={2} direction="row">
				<Button variant="text">Text</Button>
				<Button variant="contained">Contained</Button>
				<Button variant="outlined">Outlined</Button>
			</Stack>
		</Layout>
	);
}

export default App
