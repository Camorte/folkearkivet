import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { LandingPage } from "./types.ts";

export const client = createClient({
	projectId: "s06ly51d",
	dataset: "production",
	useCdn: true,
	apiVersion: "2023-05-03",
});

export async function getContributions() {
	return await client.fetch(`*[_type == "contribution"]{_id, image {
    asset->{
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      },
      url
    }
  }, title, categoryRef->{_id, name, image}, specialCategoryRef->{_id, name, image} }`);
}

export async function getContribution(id: string) {
	return await client.fetch(
		`*[_type == "contribution" && _id=="${id}"][0]{_id, title, image, description, location, categoryRef->{name, image}}`,
	);
}

export async function getProgram() {
	return await client.fetch(
		'*[_type == "event"]{title, eventSlug, description, info, "image": content[_type == "image"][0]{...}}',
	);
}

export async function getEvent(eventSlug: string) {
	return client.fetch(`*[_type=="event" && eventSlug.current=="${eventSlug}"][0]{title, eventSlug, content}`);
}

export async function getArticles() {
	return await client.fetch(
		'*[_type == "article"]{articleTitle, articleSlug, articleDescription, "articleImage": content[_type == "image"][0]{...}}',
	);
}

export async function getArticle(articleSlug: string) {
	return client.fetch(
		`*[_type=="article" && articleSlug.current=="${articleSlug}"][0]{articleTitle, articleSlug, content}`,
	);
}

export async function getCategories() {
	const [mainCategory, otherCategories] = await Promise.all([
		client.fetch(`*[_type == "mainCategory"][0]{
			_id,
			name,
			image {
				asset->{
					metadata {
						lqip,
						dimensions {
							width,
							height
						}
					},
					url
				}
			}
		}`),
		client.fetch(`*[_type == "category"]{
			_id,
			name,
			image {
				asset->{
					metadata {
						lqip,
						dimensions {
							width,
							height
						}
					},
					url
				}
			}
		}`),
	]);

	return {
		mainCategory,
		otherCategories,
	};
}

export async function getSpecialCategories() {
	return await client.fetch(`*[_type == "specialCategory"]{
			_id,
			name,
			image {
				asset->{
					metadata {
						lqip,
						dimensions {
							width,
							height
						}
					},
					url
				}
			}
		}`);
}

export async function getLandingPage(): Promise<LandingPage> {
	return client.fetch(
		`*[_type == "map"][0]{content[]{title, location{lat, lng}, year, detail, contributionRef->{_id, title}}, biography, contact}`,
	);
}

const urlBuilderFactory = imageUrlBuilder(client);

export function urlFor(image: SanityImageSource) {
	return urlBuilderFactory.image(image);
}
