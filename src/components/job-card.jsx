import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";

const description =
	"This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.";

function JobCard() {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardContent sx={{ position: "relative" }}>
				{/* Company name, role and location */}
				<Stack spacing={1} direction={"row"}>
					<Avatar
						alt="Remy Sharp"
						src="https://logo.clearbit.com/dropbox.com"
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
							Dropbox
						</Typography>
						<Typography sx={{ textAlign: "left" }} variant="caption">
							Frontend
						</Typography>
						<Typography
							sx={{ textAlign: "left", fontSize: "0.625rem" }}
							variant="caption"
						>
							Delhi
						</Typography>
					</Stack>
				</Stack>

				{/* Salary */}
				<Typography variant="caption" color="text.secondary" gutterBottom>
					Estimated salary: <strong>18-35 LPA</strong> ✅
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
							onClick={handleExpandClick}
						>
							<ExpandMoreIcon />
						</Button>
					)}
				</>

				{/* Job Description link */}
				<Link
					href="#"
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
						Minimum Experience
					</Typography>
					<Typography
						sx={{ textAlign: "left", fontSize: "0.75rem" }}
						variant="caption"
					>
						2 years
					</Typography>
				</>
			</CardContent>
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
