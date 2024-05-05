import "./App.css";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./components/Layout";
import Filters from "./components/filters";
import JobCard from "./components/job-card";

import { fetchJobs, setOffset } from "./features/jobSlice";

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

	// Initial state for filters
	const initialState = {
		roles: [],
		experience: 0,
		companyName: "",
		location: "",
		remote: "",
		minBasePay: 0,
	};

	// Setting up filters and job state
	const [filters, setFilters] = useState(initialState);
	const [job, setJob] = useState([]);

	// Getting the jobs, loading and error state from the store
	const jobs = useSelector((state) => state.jobs);
	const loading = useSelector((state) => state.loading);
	const error = useSelector((state) => state.error);

	// Initial fetch of jobs
	useEffect(() => {
		dispatch(fetchJobs()).then(() => {
			dispatch(setOffset());
		});
	}, []);

	// Updating UI based on filters
	useEffect(() => {
		const filteredJobs = filterData(filters, initialState, jobs);
		setJob(filteredJobs);
	}, [jobs, filters]);

	// Infinite scroll
	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	// Infinite scroll handler
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
