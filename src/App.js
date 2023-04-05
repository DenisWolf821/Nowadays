import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Drawer } from "./components/Drawer/Index";
import AppContext from "./context";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { useEffect, useState } from "react";
import { Favorites } from "./pages/Favorites";
import { Orders } from "./pages/Orders";

function App() {
	const [items, setItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [cartOpened, setCartOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, itemsResponse] =
					await Promise.all([
						axios.get("https://6418392975be53f451d95396.mockapi.io/cart"),
						axios.get(
							"https://641c3c44b556e431a8691fcb.mockapi.io/favorites"
						),
						axios.get(
							"https://6418392975be53f451d95396.mockapi.io/items"
						),
					]);

				setIsLoading(false);

				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert("Ошибка при запросе данных.");
				console.error(error);
			}
		}
		fetchData();
	}, []);

	const onRemoveItem = (id) => {
		try {
			axios.delete(`https://6418392975be53f451d95396.mockapi.io/cart/${id}`);
			setCartItems((prev) =>
				prev.filter((item) => Number(item.id) !== Number(id))
			);
		} catch (error) {
			alert("Ошибка при удалении из корзины.");
			console.error(error);
		}
	};

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				setFavorites((prev) =>
					prev.filter((item) => Number(item.id) !== Number(obj.id))
				);
				axios.delete(
					`https://641c3c44b556e431a8691fcb.mockapi.io/favorites/${obj.id}`
				);
			} else {
				const { data } = await axios.post(
					"https://641c3c44b556e431a8691fcb.mockapi.io/favorites",
					obj
				);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			alert("Не удалось добавить в избранное");
			console.error(error);
		}
	};

	const onAddToCart = async (obj) => {
		try {
			const findItem = cartItems.find(
				(item) => Number(item.parentId) === Number(obj.id)
			);

			if (findItem) {
				setCartItems((prev) =>
					prev.filter((item) => Number(item.parentId) !== Number(obj.id))
				);
				await axios.delete(
					`https://6418392975be53f451d95396.mockapi.io/cart/${findItem.id}`
				);
			} else {
				setCartItems((prev) => [...prev, obj]);
				const { data } = await axios.post(
					"https://6418392975be53f451d95396.mockapi.io/cart",
					obj
				);
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return { ...item, id: data.id };
						}
						return item;
					})
				);
			}
		} catch (error) {
			alert("Ошибка при добавлении в корзину.");
		}
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	const searchAlgoritm = items.filter((item) =>
		item.title.toLowerCase().includes(searchValue.toLowerCase())
	);

	return (
		<AppContext.Provider
			value={{
				items,
				favorites,
				cartItems,
				isItemAdded,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className="wrapper clear">
				<div>
					<Drawer
						items={cartItems}
						onClose={() => setCartOpened(false)}
						onRemove={onRemoveItem}
						opened={cartOpened}
					/>
				</div>
				<Header onClickCart={() => setCartOpened(true)} />
				<Routes>
					<Route
						path="/"
						element={
							<Home
								items={items}
								searchValue={searchValue}
								cartItems={cartItems}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								searchAlgoritm={searchAlgoritm}
								onAddToFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
								isLoading={isLoading}
							/>
						}
					></Route>
					<Route
						path="/favorites"
						element={
							<Favorites
								searchAlgoritm={searchAlgoritm}
								onAddToFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
							/>
						}
					></Route>
					<Route
						path="/orders"
						element={
							<Orders
								searchAlgoritm={searchAlgoritm}
								onAddToFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
							/>
						}
					></Route>
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
