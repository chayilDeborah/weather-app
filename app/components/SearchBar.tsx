"use client";
import Image from "next/image";
import React, { useState } from "react";
import search from "../assets/search.svg";
const SearchBar = () => {
	const [query, setQuery] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Searching for:", query);
	};

	return (
		<main className="flex justify-center items-center mt-[50px]">
			<section>
				<form
					onSubmit={handleSearch}
					className="flex items-center gap-2"
				>
					<input
						type="text"
						placeholder="Search for a city"
						value={query}
						onChange={handleInputChange}
						className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<button
						type="submit"
						className="p-3 bg-blue-500 text-white rounded-[50%] hover:bg-blue-600 cursor-pointer transition-colors"
					>
						<Image src={search} alt="search" className="" />
					</button>
				</form>
			</section>
		</main>
	);
};

export default SearchBar;
