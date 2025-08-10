import { urlFor } from "../lib/sanity.ts";
import classNames from "classnames";
import CategorySign from "./svgs/CategorySign.tsx";

interface Category {
	_id: string;
	name: string;
	image: {
		asset: {
			url: string;
			metadata: {
				lqip: string;
				dimensions: {
					width: number;
					height: number;
				};
			};
		};
	};
}

interface CategoryButtonProps {
	category: Category;
	isActive: boolean;
	onClick: () => void;
}

const CategoryButton = ({ category, isActive, onClick }: CategoryButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={"flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:shadow-md"}
		>
			<CategorySign imageUrl={urlFor(category.image).width(64).height(64).auto("format").url()} isActive={isActive} />
			<span
				className={classNames("", {
					"underline underline-offset-8": isActive,
					"no-underline": !isActive,
				})}
			>
				{category.name}
			</span>
		</button>
	);
};

export default CategoryButton;
