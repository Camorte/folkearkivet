const SignFolkeArkivet = ({ title, year, description }: { title: string; year?: number; description: string }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="297.5" height="208.5" fill="none" viewBox="0 0 595 417">
		<path
			fill="#CB1F27"
			d="M593 208.5C593 350.845 460.7 415 297.5 415S1.996 350.845 2 208.5 134.3 2 297.5 2 593 66.155 593 208.5"
		/>
		<path
			stroke="#fff"
			strokeWidth="3"
			d="M593 208.5C593 350.845 460.7 415 297.5 415S1.996 350.845 2 208.5 134.3 2 297.5 2 593 66.155 593 208.5Z"
		/>
		<path
			stroke="#fff"
			strokeWidth="3"
			d="M580.986 208.5c0 136.83-127.375 198.5-284.5 198.5s-284.503-61.67-284.5-198.5C11.99 71.67 139.361 10 296.486 10s284.5 61.67 284.5 198.5Z"
		/>
		<path
			stroke="#fff"
			strokeWidth="3"
			d="M532.986 209.5c0 113.393-107.228 164.5-239.5 164.5s-239.503-51.107-239.5-164.5C53.99 96.107 161.214 45 293.486 45s239.5 51.107 239.5 164.5Z"
		/>
		<text x="50%" y="38" textAnchor="middle" fontSize="20" fill="white" fontWeight="bold">
			FOLKEARKIVET
		</text>

		<text x="50%" y="100" textAnchor="middle" fontSize="32" fill="white" fontWeight="bold">
			{title}
		</text>

		{year && (
			<text x="50%" y="130" textAnchor="middle" fontSize="20" fill="white">
				{year}
			</text>
		)}

		<foreignObject x="100" y="80" width="400" height="300">
			<div
				className="w-full h-full flex items-center justify-center"
				style={{
					color: "white",
					fontSize: "22px",
					fontFamily: "serif",
					textAlign: "center",
					lineHeight: "1.2",
				}}
			>
				<div className="whitespace-pre-wrap">{description}</div>
			</div>
		</foreignObject>
	</svg>
);

export default SignFolkeArkivet;
