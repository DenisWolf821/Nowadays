import React from "react";
import { Card } from "../components/Card";

export const Home = ({
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	searchAlgoritm,
	onAddToFavorite,
	onAddToCart,
	isLoading,
}) => {
	const renderItems = () => {
		return (isLoading ? [...Array(8)] : searchAlgoritm).map((item, index) => {
			return (
				<Card
					key={index}
					onFavorite={(obj) => onAddToFavorite(obj)}
					onPlus={(obj) => onAddToCart(obj)}
					loading={isLoading}
					{...item}
				/>
			);
		});
	};

	return (
		<div className="content p-40">
			<div>
				<div className="brands">
					<span>Continental</span>
					<span>Orient</span>
					<span>Diesel</span>
					<span>Grand</span>
					<span>Seiko</span>
					<span>Patek</span>
					<span>Philippe</span>
					<span>Jaeger-LeCoultre</span>
					<span>Maurice</span>
				</div>
				<img
					className="handWatch"
					src="img/hand_watch.jpg"
					alt="Representation"
				/>
			</div>
			<div className="d-flex align-center justify-between mb-40">
				<h1>{searchValue ? searchValue : "Все часы"}</h1>
				<div className="search-block d-flex">
					<img src="img/search.svg" alt="Search" />
					{searchValue && (
						<img
							onClick={() => setSearchValue("")}
							className="removeBtn clear cu-p"
							src="img/btn_remove.svg"
							alt="Clear"
						/>
					)}
					<input
						onChange={onChangeSearchInput}
						value={searchValue}
						placeholder="Поиск..."
					/>
				</div>
			</div>

			<div className="d-flex flex-wrap">{renderItems()}</div>
		</div>
	);
};
