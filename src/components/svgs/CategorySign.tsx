const CategorySign = ({
	imageUrl,
	imageSize = 80,
	isActive,
	type = "default",
}: {
	imageUrl: string;
	imageSize?: number;
	isActive?: boolean;
	type: "default" | "special";
}) => {
	if (type === "default") {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 171 121"
				width="100%"
				height="100%"
				preserveAspectRatio="xMidYMid meet"
			>
				{/* Outer Ellipse Path */}
				<path
					d="M170.857 60.5166C170.857 101.531 132.736 120.017 85.7124 120.017C38.6886 120.017 0.56723 101.531 0.568359 60.5166C0.569489 19.502 38.6886 1.0166 85.7124 1.0166C132.736 1.0166 170.857 19.502 170.857 60.5166Z"
					stroke="white"
					fill={isActive ? "#CC302B" : "none"}
				/>
				{/* Inner Ellipse Path */}
				<path
					d="M153.564 60.8047C153.564 93.4774 122.668 108.203 84.5559 108.203C46.4436 108.203 15.5466 93.4774 15.5475 60.8047C15.5484 28.1321 46.4436 13.4064 84.5559 13.4064C122.668 13.4064 153.564 28.1321 153.564 60.8047Z"
					stroke="white"
					fill="none"
				/>

				{/* Centered Image */}
				<image
					href={imageUrl}
					x={85.7124 - imageSize / 2}
					y={60.5166 - imageSize / 2}
					width={imageSize}
					height={imageSize}
					preserveAspectRatio="xMidYMid meet"
				/>
			</svg>
		);
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 86 61"
			width="80px"
			height="100%"
			preserveAspectRatio="xMidYMid meet"
		>
			<path
				d="M85 30.0859C85 50.4209 66.1959 59.5859 43 59.5859C19.804 59.5859 0.999443 50.4209 1 30.0859C1.00056 9.75099 19.804 0.585938 43 0.585938C66.1959 0.585938 85 9.75099 85 30.0859Z"
				stroke="white"
				fill={isActive ? "#CC302B" : "none"}
			/>
			<path
				d="M76.4701 30.2288C76.4701 46.4278 61.2296 53.7288 42.4295 53.7288C23.6294 53.7288 8.38847 46.4278 8.38892 30.2288C8.38937 14.0298 23.6294 6.72879 42.4295 6.72879C61.2296 6.72879 76.4701 14.0298 76.4701 30.2288Z"
				stroke="white"
				fill="none"
			/>

			<image
				href={imageUrl}
				x={43 - imageSize / 2}
				y={30.0859 - imageSize / 2}
				width={imageSize}
				height={imageSize}
				preserveAspectRatio="xMidYMid meet"
			/>
		</svg>
	);
};

export default CategorySign;
