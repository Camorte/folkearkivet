import { SanityImageAssetDocument } from '@sanity/client';
import { PortableTextBlock } from '@portabletext/types';

export type Contribution = {
    title: string;
    description: string;
    image: SanityImageAssetDocument;
};

type SanitySlug = { current: string; _type: 'slug' };

export type ArticleOverview = {
    articleTitle: string;
    articleSlug: SanitySlug;
    articleDescription: string;
    articleImage?: SanityImageAssetDocument;
};

export type Article = {
    articleTitle: string;
    articleSlug: SanitySlug;
    content: PortableTextBlock;
};

export type StandardArticle = {
    title: string;
    content: PortableTextBlock;
};
