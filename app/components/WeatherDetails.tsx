/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OPENWEATHER_API_KEY, OPENWEATHER_API_URL } from "../config";
import deleteIcon from "../assets/delete.svg";
import star from "../assets/star.svg";
import starFilled from "../assets/star-filled.svg";
import backIcon from "../assets/back.svg";

interface DetailedWeatherData {
	name: string;
	state: string;
	country: string;
	temp: number;
	temp_max: number;
	temp_min: number;
	weather: string;
	humidity: number;
	pressure: number;
	sea_level: number;
	ground_level: number;
}

const WeatherDetails = ({
	cityName,
	countryCode,
}: {
	cityName: string;
	countryCode: string;
}) => {
	const router = useRouter();
	const [weatherData, setWeatherData] = useState<DetailedWeatherData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [note, setNote] = useState("");

	useEffect(() => {
		const fetchDetailedWeather = async () => {
			try {
				const response = await fetch(
					`${OPENWEATHER_API_URL}/weather?q=${cityName},${countryCode}&units=metric&appid=${OPENWEATHER_API_KEY}`
				);
				if (!response.ok)
					throw new Error("Failed to fetch weather data");
				const data = await response.json();

				setWeatherData({
					name: data.name,
					state: data.state || "",
					country: countryCode,
					temp: Math.round(data.main.temp),
					temp_max: Math.round(data.main.temp_max),
					temp_min: Math.round(data.main.temp_min),
					weather: data.weather[0].main.toLowerCase(),
					humidity: data.main.humidity,
					pressure: data.main.pressure,
					sea_level: data.main.sea_level || data.main.pressure,
					ground_level:
						data.main.grnd_level || data.main.pressure - 1,
				});
			} catch (err) {
				setError("Failed to load weather details");
			} finally {
				setLoading(false);
			}
		};

		fetchDetailedWeather();
	}, [cityName, countryCode]);

	if (loading)
		return (
			<div className="text-center mt-8">Loading weather details...</div>
		);
	if (error)
		return <div className="text-center mt-8 text-red-500">{error}</div>;
	if (!weatherData) return null;

	return (
		<main className="p-8 lg:max-w-3xl mx-auto relative overflow-hidden">
			<div className="image2 fixed inset-0 w-full h-full z-0"></div>
			<section className="w-full relative z-10">
				<div className="w-[95%] md:w-full mx-auto lg:max-w-[1280px]">
					<div className="flex items-center gap-4 mb-8">
						<button
							onClick={() => router.back()}
							className="p-2 rounded-full hover:bg-gray-200 transition-colors"
						>
							<Image
								src={backIcon}
								alt="back"
								width={24}
								height={24}
							/>
						</button>
						<h1 className="text-2xl font-semibold">
							{weatherData.name}
							{weatherData.state},{" "}
							<span className="text-blue-500">
								{weatherData.country}
							</span>
						</h1>
					</div>

					{/* Main weather card */}
					<div className="bg-transparent px-6 py-7 shadow-lg hover:shadow-2xl transition-shadow rounded-xl p-8 mb-6">
						<div className="flex flex-col items-center">
							<div className="text-8xl font-bold mb-4">
								{weatherData.temp}°
							</div>
							<div className="text-2xl text-gray-300 mb-4">
								{weatherData.weather}
							</div>
							<div className="text-xl text-gray-200">
								H:{weatherData.temp_max}° L:
								{weatherData.temp_min}°
							</div>
						</div>

						<div className="flex justify-center gap-4 mt-6">
							<button className="bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors">
								<Image
									src={star}
									alt="favorite"
									width={20}
									height={20}
									className=""
								/>
								Add to favorites
							</button>
							<button className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
								<Image
									src={deleteIcon}
									alt="delete"
									width={20}
									height={20}
								/>
							</button>
						</div>
					</div>

					{/* Weather details grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="bg-transparent shadow-lg hover:shadow-2xl transition-shadow  rounded-xl p-6">
							<div className="text-3xl font-bold mb-2">
								{weatherData.humidity}%
							</div>
							<div className="text-gray-200">Humidity</div>
						</div>
						<div className="bg-transparent shadow-lg hover:shadow-2xl transition-shadow  rounded-xl p-6">
							<div className="text-3xl font-bold mb-2">
								{weatherData.pressure} hPa
							</div>
							<div className="text-gray-200">Pressure</div>
						</div>
						<div className="bg-transparent shadow-lg hover:shadow-2xl transition-shadow  rounded-xl p-6">
							<div className="text-3xl font-bold mb-2">
								{weatherData.sea_level} m
							</div>
							<div className="text-gray-200">Sea Level</div>
						</div>
						<div className="bg-transparent shadow-lg hover:shadow-2xl transition-shadow  rounded-xl p-6">
							<div className="text-3xl font-bold mb-2">
								{weatherData.ground_level} m
							</div>
							<div className="text-gray-200">Ground Level</div>
						</div>
					</div>

					{/* Notes section */}
					<div className="mt-8">
						<h2 className="text-xl mb-2">
							Notes: <span className="text-gray-200">0</span>
						</h2>
						<div className="bg-transparent shadow-lg hover:shadow-2xl transition-shadow  rounded-xl p-4">
							<textarea
								value={note}
								onChange={(e) => setNote(e.target.value)}
								placeholder="Add a note"
								className="w-full bg-transparent border-none resize-none focus:outline-none"
								rows={4}
							/>
							<button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
								Add Note
							</button>
						</div>
						<div className="mt-4 text-center text-gray-200">
							No notes yet
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default WeatherDetails;
