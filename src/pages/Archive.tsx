import Layout from "../components/Layout.tsx";
import { useEffect, useState } from "react";
import { getContributions, getCategories, urlFor, getSpecialCategories } from "../lib/sanity.ts";
import { ContributionOverview, CategoryStructure, SpecialCategoryStructure } from "../lib/types.ts";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CategoryButton from "../components/CategoryButton.tsx";

const Archive = () => {
	const [archive, setArchive] = useState<ContributionOverview[]>([]);
	const [allContributions, setAllContributions] = useState<ContributionOverview[]>([]);
	const [categoryStructure, setCategoryStructure] = useState<CategoryStructure | null>(null);
	const [specialCategoryStructure, setSpecialCategoryStructure] = useState<SpecialCategoryStructure | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

	useEffect(() => {
		Promise.all([getContributions(), getCategories(), getSpecialCategories()])
			.then(
				([contributionsData, categoriesData, specialCategoriesData]: [
					ContributionOverview[],
					CategoryStructure,
					SpecialCategoryStructure,
				]) => {
					setAllContributions(contributionsData);
					setArchive(contributionsData);
					setCategoryStructure(categoriesData);
					setSpecialCategoryStructure(specialCategoriesData);
				},
			)
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleCategoryFilter = (categoryId: string | null) => {
		setSelectedCategory(categoryId);
		console.log(categoryId);
		if (categoryId === null) {
			setArchive(allContributions);
		} else {
			const filtered = allContributions.filter(
				(contribution) =>
					contribution.categoryRef?._id === categoryId || contribution.specialCategoryRef?._id === categoryId,
			);
			setArchive(filtered);
		}
	};

	return (
		<Layout>
			<div className="mb-8">
				{categoryStructure && (
					<div className="flex flex-row overflow-x-auto gap-4 mb-4 min-w-max items-center ">
						{categoryStructure.mainCategory && (
							<CategoryButton
								name={categoryStructure.mainCategory.name}
								image={categoryStructure.mainCategory.image}
								isActive={selectedCategory === null}
								onClick={() => handleCategoryFilter(null)}
							/>
						)}
						{categoryStructure.otherCategories.map((category) => (
							<CategoryButton
								key={category._id}
								name={category.name}
								image={category.image}
								isActive={selectedCategory === category._id}
								onClick={() => handleCategoryFilter(category._id)}
							/>
						))}
					</div>
				)}
				{specialCategoryStructure && (
					<div className="flex flex-row items-center justify-center min-w-max gap-4 overflow-x-auto">
						{specialCategoryStructure.map((specialCategory) => (
							<CategoryButton
								key={specialCategory._id}
								name={specialCategory.name}
								image={specialCategory.image}
								isActive={selectedCategory === specialCategory._id}
								onClick={() => handleCategoryFilter(specialCategory._id)}
								type="special"
							/>
						))}
					</div>
				)}
			</div>
			<ul className="photo-gallery">
				{archive.map((contribution, index) => (
					<li key={contribution._id + "-" + index} className="relative group mb-[12px]">
						<div className="relative w-full mb-2 overflow-hidden">
							<img
								width={400}
								height={400}
								className="invisible"
								alt=""
								aria-hidden="true"
								src={contribution.image.asset.metadata.lqip}
							/>
							{!loadedImages[contribution._id] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
							<Link to={`/arkivet/${contribution._id}`}>
								<img
									className={classNames(
										"absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 hover:opacity-50",
										{
											"opacity-0": !loadedImages[contribution._id],
											"opacity-100": loadedImages[contribution._id],
										},
									)}
									width={400}
									height={400}
									srcSet={[
										`${urlFor(contribution.image).width(300).auto("format").url()} 300w`,
										`${urlFor(contribution.image).width(600).auto("format").url()} 600w`,
										`${urlFor(contribution.image).width(900).auto("format").url()} 900w`,
									].join(", ")}
									sizes="(max-width: 640px) 50vw, 20vw"
									alt={contribution.title}
									onLoad={() => {
										setLoadedImages((prev) => ({
											...prev,
											[contribution._id]: true,
										}));
									}}
								/>
							</Link>
						</div>
					</li>
				))}
			</ul>
		</Layout>
	);
};

export default Archive;
