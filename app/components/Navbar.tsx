import React from "react";

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center p-4 mt-[10px] text-white">
			<div className="flex justify-between items-center w-[90%] mx-auto ">
				<h1 className="text-[24px] font-extrabold ">
					CTech Weather App
				</h1>
				<div className="bg-gray-100 text-black rounded-[16px] h-[35px]  py-[10px] px-[12px] my-auto flex items-center">
					{" "}
					<span className="text-green-500 text-4xl pr-[5px] ">
						•{" "}
					</span>{" "}
					Online
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
