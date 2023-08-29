import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Cards = (props) => {
	return (
		<Card variant="outlined">
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
			<CardActions>
				<Link to={props.item.Link}>
					<Button size="small">{props.item.buttonLink}</Button>
				</Link>
			</CardActions>
		</Card>
	);
};

export default Cards;
