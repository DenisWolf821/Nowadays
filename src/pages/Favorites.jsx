import React from "react";
import { Card } from "../components/Card";
import AppContext from "../context";

export const Favorites = ({ onAddToFavorite, onAddToCart }) => {
	const { favorites } = React.useContext(AppContext);

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h2>Избранное</h2>
			</div>
			<div className="d-flex flex-wrap">
				{favorites.map((item, index) => {
					return (
						<Card
							key={index}
							onFavorite={(obj) => onAddToFavorite(obj)}
							onPlus={(obj) => onAddToCart(obj)}
							selected={true}
							{...item}
						/>
					);
				})}
			</div>
		</div>
	);
};
