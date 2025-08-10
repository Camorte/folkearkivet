const CategorySign = ({
	imageUrl,
	imageSize = 80,
	isActive,
}: {
	imageUrl: string;
	imageSize?: number;
	isActive?: boolean;
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 171 121"
		width="100%"
		height="auto"
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

export default CategorySign;
