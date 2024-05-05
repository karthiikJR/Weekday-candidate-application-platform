export function filterData(filters, initialState, jobs) {
	if (JSON.stringify(filters) === JSON.stringify(initialState)) {
		return jobs;
	} else {
		return jobs.filter((job) => {
			let isJobIncluded = true;
			const dataOnly = filters.roles.map((role) => role.data.toLowerCase());

			if (dataOnly.length > 0) {
				isJobIncluded =
					isJobIncluded && dataOnly.includes(job.jobRole.toLowerCase());
			}

			if (Number(filters.experience) > 0) {
				isJobIncluded =
					isJobIncluded &&
					(Number(filters.experience) >= Number(job.minExp)) | 0 &&
					(Number(filters.experience) <= Number(job.maxExp)) | Infinity;
			}

			if (filters.companyName !== "") {
				isJobIncluded =
					isJobIncluded &&
					job.companyName
						.toLowerCase()
						.includes(filters.companyName.toLowerCase());
			}

			if (
				filters.location !== "" &&
				filters.remote.toLowerCase() !== "remote"
			) {
				isJobIncluded =
					isJobIncluded &&
					job.location.toLowerCase().includes(filters.location.toLowerCase());
			}

			if (
				filters.location.toLowerCase() !== "remote" &&
				filters.remote.toLowerCase() === "on-site"
			) {
				isJobIncluded =
					isJobIncluded && job.location.toLowerCase() !== "remote";
				console.log(isJobIncluded, "next one");
			}

			if (filters.remote.toLowerCase() === "remote") {
				console.log("remote", job.location, filters.remote.toLowerCase());
				isJobIncluded = isJobIncluded && job.location === "remote";
			}
			if (Number(filters.minBasePay) > 0) {
				const sal = Number(filters.minBasePay);
				isJobIncluded =
					isJobIncluded &&
					sal >= (Number(job.minJdSalary) | 0) &&
					sal <= (Number(job.maxJdSalary) | Infinity);
			}
			console.log(isJobIncluded);
			return isJobIncluded;
		});
	}
}
