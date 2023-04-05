import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "../components/Card";

export const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchDataOrders() {
			try {
				const ordersResponse = await axios.get(
					"https://641c3c44b556e431a8691fcb.mockapi.io/orders"
				);
				setOrders(ordersResponse.data.map((obj) => obj.items).flat());
				setIsLoading(false);
			} catch (error) {
				alert("Произошла ошибка");
			}
		}

		fetchDataOrders();
	}, []);
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h2>Личный кабинет</h2>
			</div>
			<div className="d-flex flex-wrap">
				{(isLoading ? [...Array(8)] : orders).map((item, index) => {
					return <Card key={index} loading={isLoading} {...item} />;
				})}
			</div>
		</div>
	);
};
