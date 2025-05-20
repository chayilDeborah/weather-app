import Homepage from "./components/Homepage";

export default function Home() {
	return (
		<main className="flex justify-center relative overflow-hidden">
			<div className="image2 fixed inset-0 w-full h-full z-0"></div>
			<section className="w-full relative z-10">
				<div className="w-[95%] md:w-full mx-auto lg:max-w-[1280px]">
					<Homepage />
				</div>
			</section>
		</main>
	);
}
