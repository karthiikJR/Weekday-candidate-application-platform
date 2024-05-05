import "./App.css";

import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./components/Layout";
import Filters from "./components/filters";

import { fetchJobs, setOffset } from "./features/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "./components/job-card";
import { Typography } from "@mui/material";
import { filterData } from "./utils/job-helper";

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
	const dispatch = useDispatch();
	const initialState = {
		roles: [],
		experience: 0,
		companyName: "",
		location: "",
		remote: "",
		minBasePay: 0,
	};
	const [filters, setFilters] = useState(initialState);
	const [job, setJob] = useState([]);

	const jobs = useSelector((state) => state.jobs);

	const loading = useSelector((state) => state.loading);
	const error = useSelector((state) => state.error);

	useEffect(() => {
		const filteredJobs = filterData(filters, initialState, jobs);
		setJob(filteredJobs);
	}, [jobs]);

	useEffect(() => {
		dispatch(fetchJobs()).then(() => {
			dispatch(setOffset());
		});
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	useEffect(() => {
		const filteredJobs = filterData(filters, initialState, jobs);
		setJob(filteredJobs);
	}, [filters]);

	const scrollHandler = () => {
		if (
			window.innerHeight + Math.round(window.scrollY) >=
			document.body.offsetHeight - 2
		) {
			dispatch(fetchJobs()).then(() => {
				dispatch(setOffset());
			});
		}
	};

	return (
		<ThemeProvider theme={THEME}>
			<Layout>
				<Stack
					sx={{ padding: "10px", width: "100%" }}
					spacing={2}
					direction="column"
				>
					<Filters setFilters={setFilters} />
					<Stack
						useFlexGap
						flexWrap="wrap"
						sx={{ padding: "10px" }}
						justifyContent={"space-around"}
						spacing={4}
						direction="row"
					>
						{error && <p>Error: {error}</p>}
						{jobs &&
							jobs.length > 0 &&
							job.map((job) => <JobCard key={job.jdUid} job={job} />)}
					</Stack>
				</Stack>

				{loading && (
					<Typography sx={{ p: "10px", textAlign: "center" }} variant="h1">
						Loading...
					</Typography>
				)}
			</Layout>
		</ThemeProvider>
	);
}

export default App;
