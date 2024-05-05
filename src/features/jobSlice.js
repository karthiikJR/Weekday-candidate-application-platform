import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk(
	"job/fetchJobs",
	async (object, { getState, rejectWithValue }) => {
		const offset = Number(getState().offset);

		try {
			const response = await fetch(
				"https://api.weekday.technology/adhoc/getSampleJdJSON",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						limit: 10,
						offset: offset,
					}),
				}
			);
			const data = await response.json();
			return data.jdList;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const initialState = {
	jobs: [],
	filters: {
		roles: [],
		experience: 0,
		companyName: "",
		location: "",
		remote: false,
		minBasePay: 0,
	},
	offset: 1,
	loading: false,
	error: null,
};

const jobSlice = createSlice({
	name: "job",
	initialState,
	reducers: {
		setFilters: (state, action) => {
			state.filters = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchJobs.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchJobs.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.jobs = [...state.jobs, ...action.payload];
			})
			.addCase(fetchJobs.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred";
			});
	},
});

export const { setFilters } = jobSlice.actions;

export default jobSlice.reducer;
