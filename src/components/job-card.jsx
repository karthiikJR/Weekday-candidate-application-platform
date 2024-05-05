import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";

function JobCard({ job }) {
	// Expand job description
	const [expanded, setExpanded] = useState(false);

	const description = job.jobDetailsFromCompany;

	const UpdateExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: 345, height: "fit-content" }}>
			<CardContent sx={{ position: "relative" }}>
				{/* Company name, role and location */}
				<Stack spacing={1} direction={"row"}>
					<Avatar
						alt="Remy Sharp"
						src={job.logoUrl}
						sx={{ width: 40, height: 40 }}
					/>
					<Stack direction={"column"}>
						<Typography
							color={"Gray"}
							sx={{
								textAlign: "left",
								fontSize: "0.625rem",
								fontWeight: "bold",
								letterSpacing: "0.5px",
							}}
							variant="h3"
						>
							{job.companyName}
						</Typography>
						<Typography
							sx={{ textAlign: "left", textTransform: "capitalize" }}
							variant="caption"
						>
							{job.jobRole}
						</Typography>
						<Typography
							sx={{
								textAlign: "left",
								fontSize: "0.625rem",
								textTransform: "capitalize",
							}}
							variant="caption"
						>
							{job.location}
						</Typography>
					</Stack>
				</Stack>

				{/* Salary */}
				<Typography variant="caption" color="text.secondary" gutterBottom>
					Estimated salary:{" "}
					<strong>
						{job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}
					</strong>{" "}
					✅
				</Typography>

				{/* Job Description:  */}
				<>
					<Typography
						sx={{ mt: "0.25rem", fontWeight: "bold" }}
						gutterBottom
						variant="body1"
					>
						Job Description:
					</Typography>
					<Typography sx={{ letterSpacing: "0.1px" }} variant="caption">
						{description.length > 200 && !expanded
							? description.substring(0, 200) + "..."
							: description}
					</Typography>
					{description.length > 200 && (
						<Button
							sx={{ rotate: expanded ? "180deg" : "0deg" }}
							onClick={UpdateExpanded}
						>
							<ExpandMoreIcon />
						</Button>
					)}
				</>

				{/* Job Description link */}
				<Link
					href={job.jdLink}
					sx={{
						fontFamily: "lexend",
						textAlign: "center",
						display: "block",
						fontSize: "0.75rem",
						my: "0.5rem",
					}}
					underline="none"
				>
					Know more
				</Link>

				{/* Experience */}
				<>
					<Typography
						sx={{
							mt: "1rem",
							textAlign: "left",
							fontWeight: "bold",
							fontSize: "0.75rem",
						}}
						variant="body1"
						color="text.secondary"
						gutterBottom
					>
						Experience
					</Typography>
					<Typography
						sx={{ textAlign: "left", fontSize: "0.75rem" }}
						variant="caption"
					>
						{job.minExp} years - {job.maxExp} years
					</Typography>
				</>
			</CardContent>

			{/* Apply button */}
			<CardActions>
				<Button
					sx={{ width: "100%", bgcolor: "#55efc4", color: "black" }}
					color="primary"
				>
					⚡ Easy Apply
				</Button>
			</CardActions>
		</Card>
	);
}

export default JobCard;
