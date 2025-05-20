import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import CityCards from "./CityCards";
const Homepage = () => {
	return (
		<main className="flex justify-center relative overflow-hidden">
			<div className="image fixed inset-0 w-full h-full z-0"></div>
			<section className="w-full relative z-10">
				<div className="w-[95%] md:w-full mx-auto lg:max-w-[1280px]">
					<Navbar />
					{/* <div className="flex flex-col mt-[50px] w-[80%] ">
						<h1 className="text-white text-[20px] font-extrabold">
							Stay ahead with real-time weather updates from
							around the world.
							<br />
							Powered by Climezy Technologies — making weather
							tracking personal and fun.
						</h1>
					</div> */}
					<SearchBar />
					<CityCards />
				</div>
			</section>
		</main>
	);
};

export default Homepage;
