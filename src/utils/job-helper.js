/*
 * This file contains helper functions for filtering of job data
 * @param {Object} filters - The filters object, intialState - initial state of data, jobs - all jobs
 */

export function filterData(filters, initialState, jobs) {
	// If filters are empty, return all jobs
	if (JSON.stringify(filters) === JSON.stringify(initialState)) {
		return jobs;
	} else {
		return jobs.filter((job) => {
			let isJobIncluded = true;
			const dataOnly = filters.roles.map((role) => role.data.toLowerCase());

			// Check if the roles are included in the filters
			if (dataOnly.length > 0) {
				isJobIncluded =
					isJobIncluded && dataOnly.includes(job.jobRole.toLowerCase());
			}

			// Check if the experience is given in the filters
			if (Number(filters.experience) > 0) {
				isJobIncluded =
					isJobIncluded &&
					(Number(filters.experience) >= Number(job.minExp)) | 0 &&
					(Number(filters.experience) <= Number(job.maxExp)) | Infinity;
			}

			// Filter for the company name
			if (filters.companyName !== "") {
				isJobIncluded =
					isJobIncluded &&
					job.companyName
						.toLowerCase()
						.includes(filters.companyName.toLowerCase());
			}

			// Filter for the location
			if (
				filters.location !== "" &&
				filters.remote.toLowerCase() !== "remote"
			) {
				isJobIncluded =
					isJobIncluded &&
					job.location.toLowerCase().includes(filters.location.toLowerCase());
			}

			// Filtering for on-site jobs (since the location is given)
			if (
				filters.location.toLowerCase() !== "remote" &&
				filters.remote.toLowerCase() === "on-site"
			) {
				isJobIncluded =
					isJobIncluded && job.location.toLowerCase() !== "remote";
			}

			// Filtering for remote jobs
			if (filters.remote.toLowerCase() === "remote") {
				isJobIncluded = isJobIncluded && job.location === "remote";
			}

			// Filter for minimum base pay
			if (Number(filters.minBasePay) > 0) {
				const sal = Number(filters.minBasePay);
				isJobIncluded =
					isJobIncluded &&
					sal >= (Number(job.minJdSalary) | 0) &&
					sal <= (Number(job.maxJdSalary) | Infinity);
			}
			return isJobIncluded;
		});
	}
}
