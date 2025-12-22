import { urlFor } from "../lib/sanity.ts";
import classNames from "classnames";
import CategorySign from "./svgs/CategorySign.tsx";
import { SanityImageWithMetadata } from "../lib/types.ts";

interface CategoryButtonProps {
	name: string;
	image?: SanityImageWithMetadata;
	isActive: boolean;
	onClick: () => void;
	type?: "default" | "special";
}

const CategoryButton = ({ name, image, isActive, onClick, type = "default" }: CategoryButtonProps) => {
	const imageWidthAndHeight = type === "default" ? 64 : 32;

	return (
		<button
			onClick={onClick}
			className={
				"grow shrink-0 flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:shadow-md"
			}
		>
			{image && (
				<CategorySign
					imageUrl={urlFor(image).width(imageWidthAndHeight).height(imageWidthAndHeight).auto("format").url()}
					isActive={isActive}
					imageSize={type === "default" ? 80 : 40}
					type={type}
				/>
			)}
			<span
				className={classNames("text-base mt-2", {
					"underline underline-offset-8": isActive,
					"no-underline": !isActive,
				})}
			>
				{name.toUpperCase()}
			</span>
		</button>
	);
};

export default CategoryButton;
