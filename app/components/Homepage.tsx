import React from "react";
import Navbar from "./Navbar";

const Homepage = () => {
	return (
		<main className="flex justify-center bg-[#0A0016] relative overflow-hidden">
			<div className="image2 fixed inset-0 w-full h-full z-0"></div>
			<section className="w-full relative z-10">
				<div className="w-[95%] md:w-full mx-auto lg:max-w-[1280px]">
					<Navbar />
				</div>
			</section>
		</main>
	);
};

export default Homepage;
