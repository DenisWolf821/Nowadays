import { useState } from "react";
import React from "react";
import axios from "axios";
import { Info } from "../Info";
import { useTotalPrice } from "../../hooks/useTotalPrice";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Drawer = ({ onClose, onRemove, items = [], opened }) => {
	const { cartItems, setCartItems, totalPrice } = useTotalPrice();
	const [orderID, setOrderID] = useState(null);
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				"https://641c3c44b556e431a8691fcb.mockapi.io/orders",
				{ items: cartItems }
			);

			setOrderID(data.id);
			setIsOrderComplete(true);
			setCartItems([]);

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete(
					"https://6418392975be53f451d95396.mockapi.io/cart/" + item.id
				);
				await delay(2000);
			}
		} catch (error) {
			alert(" Ошибка при создании заказа");
		}
		setIsLoading(false);
	};
	console.log();
	return (
		<div
			className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}
		>
			<div className={styles.drawer}>
				<h2 className="d-flex justify-between mb-30 ">
					Корзина
					<img
						onClick={onClose}
						className="removeBtn cu-p"
						src="img/btn_remove.svg"
						alt="Close"
					/>
				</h2>

				{items.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className="items flex">
							{items.map((obj) => (
								<div
									key={obj.id}
									className="cartItem d-flex align-center mb-20"
								>
									<div
										style={{
											backgroundImage: `url(${obj.imageUrl})`,
										}}
										className="cartItemImg"
									></div>

									<div className="mr-20 flex">
										<p className="mb-5">{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className="removeBtn"
										src="img/btn_remove.svg"
										alt="Remove"
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li>
									<span>Итого: </span>
									<div></div>
									<b>{totalPrice} руб. </b>
								</li>
								<li>
									<span>Налог 13%:</span>
									<div></div>
									<b>{((totalPrice / 100) * 13).toFixed(2)} руб.</b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className="blackButton"
							>
								Оформить заказ{" "}
								<img
									className="ml-20"
									src="img/arrow.svg"
									alt="Arrow"
								/>
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
						description={
							isOrderComplete
								? `Ваш заказ ${orderID} скоро будет передан курьерской доставке`
								: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
						}
						image={
							isOrderComplete
								? "img/complete-order.jpg"
								: "img/empty-cart.jpg"
						}
					/>
				)}
			</div>
		</div>
	);
};
