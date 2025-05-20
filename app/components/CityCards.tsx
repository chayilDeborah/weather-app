"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { City, WeatherResponse } from "../types";
import {
	LARGEST_CITIES,
	OPENWEATHER_API_KEY,
	OPENWEATHER_API_URL,
} from "../config";
import deleteIcon from "../assets/delete.svg";
import star from "../assets/star.svg";
import starFilled from "../assets/star-filled.svg";

const CityCards = () => {
	const router = useRouter();
	const [cities, setCities] = useState<City[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchWeatherData = async () => {
		try {
			setLoading(true);
			const weatherPromises = LARGEST_CITIES.map(async (city) => {
				const response = await fetch(
					`${OPENWEATHER_API_URL}/weather?q=${city.name},${city.country}&units=metric&appid=${OPENWEATHER_API_KEY}`
				);
				if (!response.ok)
					throw new Error(`Error fetching weather for ${city.name}`);
				const data: WeatherResponse = await response.json();
				return {
					name: city.name,
					country: city.country,
					temp: Math.round(data.main.temp),
					weather: data.weather[0].main.toLowerCase(),
					id: Date.now() + Math.random(),
					favorite: false,
				};
			});

			const weatherData = await Promise.all(weatherPromises);
			setCities(sortCities(weatherData));
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to fetch weather data"
			);
		} finally {
			setLoading(false);
		}
	};

	const sortCities = (cityList: City[]) => {
		return [...cityList].sort((a, b) => {
			// First sort by favorite status
			if (a.favorite && !b.favorite) return -1;
			if (!a.favorite && b.favorite) return 1;
			// Then sort alphabetically
			return a.name.localeCompare(b.name);
		});
	};

	const toggleFavorite = (id: number) => {
		const updatedCities = cities.map((city) =>
			city.id === id ? { ...city, favorite: !city.favorite } : city
		);
		setCities(sortCities(updatedCities));
	};

	const navigateToDetails = (city: City) => {
		router.push(`/weather/${encodeURIComponent(city.name)}/${encodeURIComponent(city.country)}`);
	};

	useEffect(() => {
		fetchWeatherData();
	}, []);

	const handleDelete = (id: number) => {
		setCities(cities.filter((city) => city.id !== id));
	};

	if (loading)
		return <div className="text-center mt-8">Loading weather data...</div>;
	if (error)
		return <div className="text-center mt-8 text-red-500">{error}</div>;

	return (
		<main className="p-8 md:w-[50%] w-[90%] mx-auto mt-[50px]">
			<section className="grid grid-cols-1 gap-4">
				{cities.map((city) => (
					<div
						key={city.id}
						className="bg-transparent rounded-lg px-6 py-7 shadow-lg hover:shadow-2xl transition-shadow"
					>
						<div className="flex justify-between items-start">
							<div 
								onClick={() => navigateToDetails(city)}
								className="cursor-pointer"
							>
								<h2
									className={`text-2xl font-semibold ${
										city.favorite ? "text-blue-500" : ""
									}`}
								>
									{city.name}
								</h2>
								<p className="text-gray-200 font-semibold mt-[10px]">
									{city.country}
								</p>
							</div>
							<div 
								className="text-4xl font-bold cursor-pointer"
								onClick={() => navigateToDetails(city)}
							>
								{city.temp}°
							</div>
						</div>
						<div className="mt-4 flex justify-between items-center mb-[10px]">
							<div className="flex gap-2">
								<button
									onClick={() => toggleFavorite(city.id)}
									className={`py-2 px-3 hover:bg-gray-300 rounded-full bg-white transition-colors text-black flex gap-2 items-center cursor-pointer`}
								>
									<Image
										src={city.favorite ? starFilled : star}
										alt="favorite"
										width={20}
										height={20}
										className={city.favorite ? "text-blue-500" : ""}
									/>
									<h2>
										{city.favorite
											? "Remove from favorites"
											: "Add to favorites"}
									</h2>
								</button>
								<button
									onClick={() => handleDelete(city.id)}
									className="p-2 hover:bg-gray-300 bg-white rounded-full w-[40px] h-[40px] pl-[10px] cursor-pointer transition-colors"
								>
									<Image
										src={deleteIcon}
										alt="delete"
										width={20}
										height={20}
									/>
								</button>
							</div>
							<p className="text-gray-200 text-lg">
								{city.weather}
							</p>
						</div>
					</div>
				))}
			</section>
		</main>
	);
};

export default CityCards;
