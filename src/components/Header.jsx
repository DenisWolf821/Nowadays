import React from "react";
import { useTotalPrice } from "../hooks/useTotalPrice";
import { Link } from "react-router-dom";

export const Header = (props) => {
	const { totalPrice } = useTotalPrice();

	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img width={60} height={60} src="img/Logo.svg" alt="Logotype" />

					<div>
						<h3 className="text-uppercase">React Nowadays</h3>
						<p className="opacity-5">Магазин лучших часов</p>
					</div>
				</div>
			</Link>

			<ul className="d-flex">
				<li onClick={props.onClickCart} className="mr-30 cu-p">
					<img width={30} height={30} src="img/basket.svg" alt="Cart" />
					<span>{totalPrice} руб.</span>
				</li>
				<li className="mr-20 cu-p">
					<Link to="/favorites">
						<img
							width={30}
							height={30}
							src="img/heart.svg"
							alt="Favorites"
						/>
					</Link>
				</li>
				<li className="cu-p">
					<Link to="/orders">
						<img
							width={30}
							height={30}
							src="img/cabinet.svg"
							alt="User"
						/>
					</Link>
				</li>
			</ul>
		</header>
	);
};
