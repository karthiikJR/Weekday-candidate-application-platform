import React, { useState } from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as data from "../data/dropdown-options";
import Stack from "@mui/material/Stack";

function Filters({setFilters}) {
	

	const handleRolesChange = (event, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			roles: value || [],
		}));
	};

	const handleExperienceChange = (event, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			experience: value || 0,
		}));
	};

	const handleRemoteChange = (event, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			remote: value || "on-site",
		}));
	};

	const handleSalaryChange = (event, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			minBasePay: value || 0,
		}));
	};

	const handleCompanyNameChange = (event) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			companyName: event.target.value,
		}));
	};

	const handleLocationChange = (event) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			location: event.target.value,
		}));
	};

	return (
		<Stack
			sx={{ fontSize: "0.5rem" }}
			useFlexGap
			flexWrap="wrap"
			direction={"row"}
		>
			{/* Roles */}
			<Autocomplete
				sx={{ m: 1, minWidth: 150, fontSize: "0.5rem" }}
				multiple
				options={data.roles}
				onChange={handleRolesChange}
				groupBy={(option) => option.type}
				getOptionLabel={(option) => option.data}
				renderInput={(params) => (
					<TextField
						sx={{ fontSize: "0.rem" }}
						{...params}
						variant="outlined"
						placeholder="Roles"
					/>
				)}
				renderOption={(props, option, { selected }) => (
					<MenuItem
						key={option}
						{...props}
						value={option.data}
						sx={{ justifyContent: "space-between", fontSize: "0.75rem" }}
					>
						{option.data}
						{selected ? <CheckIcon color="info" /> : null}
					</MenuItem>
				)}
			/>

			{/* Experience */}
			<Autocomplete
				sx={{ m: 1, minWidth: 150 }}
				options={data.experience}
				onChange={handleExperienceChange}
				getOptionLabel={(option) => String(option)}
				renderInput={(params) => (
					<TextField {...params} variant="outlined" placeholder="Experience" />
				)}
				renderOption={(props, option, { selected }) => (
					<MenuItem
						{...props}
						key={option}
						value={option}
						sx={{ justifyContent: "space-between", fontSize: "0.75rem" }}
					>
						{option}
						{selected ? <CheckIcon color="info" /> : null}
					</MenuItem>
				)}
			/>

			{/* Job place */}
			<Autocomplete
				sx={{ m: 1, minWidth: 150 }}
				options={data.location}
				onChange={handleRemoteChange}
				getOptionLabel={(option) => String(option)}
				renderInput={(params) => (
					<TextField {...params} variant="outlined" placeholder="Remote" />
				)}
				renderOption={(props, option, { selected }) => (
					<MenuItem
						{...props}
						key={option}
						value={option}
						sx={{ justifyContent: "space-between", fontSize: "0.75rem" }}
					>
						{option}
						{selected ? <CheckIcon color="info" /> : null}
					</MenuItem>
				)}
			/>

			{/* Salary */}
			<Autocomplete
				sx={{ m: 1, minWidth: 250 }}
				options={data.salary}
				onChange={handleSalaryChange}
				getOptionLabel={(option) => String(option)}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						placeholder="Min Base Pay Salary"
					/>
				)}
				renderOption={(props, option, { selected }) => (
					<MenuItem
						{...props}
						key={option}
						value={option}
						sx={{ justifyContent: "space-between", fontSize: "0.75rem" }}
					>
						{option + "L"}
						{selected ? <CheckIcon color="info" /> : null}
					</MenuItem>
				)}
			/>

			{/* Company */}
			<TextField
				sx={{ m: 1 }}
				required
				onChange={handleCompanyNameChange}
				id="outlined-required"
				placeholder="Company Name"
			/>

			{/* Location */}
			<TextField
				sx={{ m: 1 }}
				required
				onChange={handleLocationChange}
				id="outlined-required"
				placeholder="Location"
			/>
		</Stack>
	);
}

export default Filters;
