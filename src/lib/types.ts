import { SanityImageAssetDocument } from '@sanity/client';
import { PortableTextBlock } from '@portabletext/types';

export type ContributionOverview = {
    _id: string;
    title: string;
    image: SanityImageAssetDocument;
};

export type Contribution = {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    src: string;
    image: SanityImageAssetDocument;
};

type SanitySlug = { current: string; _type: 'slug' };

export type LandingPage = {
    title: string;
    image: SanityImageAssetDocument;
};

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

export type ProgramOverview = {
    title: string;
    info: string;
    description: string;
    image?: SanityImageAssetDocument;
};

export type Event = {
    title: string;
    eventSlug: SanitySlug;
    content: PortableTextBlock;
};
