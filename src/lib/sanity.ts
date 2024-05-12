import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: 's06ly51d',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03'
});

export async function getContributions() {
    return await client.fetch(
        '*[_type == "contribution"]{title, image, description}'
    );
}

export async function getArticles() {
    return await client.fetch(
        '*[_type == "article"]{articleTitle, articleSlug, articleDescription, "articleImage": content[_type == "image"][0]{...}}'
    );
}

export async function getArticle(articleSlug: string) {
    return client.fetch(
        `*[_type=="article" && articleSlug.current=="${articleSlug}"][0]{articleTitle, articleSlug, content}`
    );
}

export async function getBiography() {
    return client.fetch(`*[_type=="biography"][0]{title, content}`);
}

export async function getContact() {
    return client.fetch(`*[_type=="contact"][0]{title, content}`);
}

const urlBuilderFactory = imageUrlBuilder(client);

export function urlFor(image: SanityImageSource) {
    return urlBuilderFactory.image(image);
}
