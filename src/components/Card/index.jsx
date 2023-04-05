import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import styles from "./Card.module.scss";

export const Card = ({
	id,
	title,
	onFavorite,
	imageUrl,
	price,
	onPlus,
	selected = false,
	loading = false,
}) => {
	const { isItemAdded } = React.useContext(AppContext);
	const [isFavorite, setIsFavorite] = useState(selected);
	const itemObj = { id, parentId: id, title, imageUrl, price };

	const onClickPlus = () => {
		onPlus(itemObj);
	};

	const onClickFavorite = () => {
		onFavorite(itemObj);
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={155}
					height={250}
					viewBox="0 0 155 265"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
					<rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
					<rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
					<rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
					<rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
				</ContentLoader>
			) : (
				<>
					{onFavorite && (
						<div className={styles.favorite} onClick={onClickFavorite}>
							<img
								src={
									isFavorite
										? "img/heart.svg"
										: "img/heart_unliked.svg"
								}
								alt="Unliked"
							/>
						</div>
					)}
					<img className={styles.watch} src={imageUrl} alt="Watch" />
					<h2>{title}</h2>
					<div className={styles.price}>
						<div className="d-flex flex-column">
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						{onPlus && (
							<img
								className={styles.plus}
								onClick={onClickPlus}
								src={
									isItemAdded(id)
										? "img/btn_checked.svg"
										: "img/btn_plus.svg"
								}
								alt="Plus"
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};
