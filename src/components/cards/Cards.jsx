import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

const Cards = (props) => {
	return (
		<Col lg={4} sm={8} className="mb-4">
			<Card variant="outlined" className={`${props.needLink || "py-4"}`}>
				<CardContent className="relative">
					<Typography variant="h5" component="div">
						{props.item.title}
					</Typography>
					<Typography variant="h5" className="absolute right-0 px-8">
						{props.item.value}
					</Typography>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{props.item.description}
					</Typography>
				</CardContent>
				{props.needLink && (
					<CardActions>
						<Link to={props.item.Link}>
							<Button size="small">{props.item.buttonLink}</Button>
						</Link>
					</CardActions>
				)}
			</Card>
		</Col>
	);
};

export default Cards;
