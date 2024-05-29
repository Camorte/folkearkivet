import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { getArticles, urlFor } from '../lib/sanity.ts';
import { ArticleOverview } from '../lib/types.ts';
import { Link } from 'react-router-dom';

const ArticlesOverview = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState<ArticleOverview[]>([]);

    useEffect(() => {
        getArticles()
            .then((response) => {
                setArticles(response);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <Layout>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="flex flex-col gap-y-8">
                    {articles.map((article) => (
                        <li
                            key={article.articleSlug.current}
                            className="flex flex-col md:flex-row gap-x-8"
                        >
                            <Link
                                className="mb-4 md:mb-0"
                                to={`/artikler/${article.articleSlug.current}`}
                            >
                                {article.articleImage ? (
                                    <img
                                        className="border-2 max-w-[400px] md:mb-0"
                                        src={urlFor(article.articleImage).url()}
                                        alt={article.articleTitle}
                                    />
                                ) : (
                                    <div className="w-full md:min-w-[400px] min-h-[400px] border-2"></div>
                                )}
                            </Link>
                            <div className="flex flex-col">
                                <Link
                                    className="group"
                                    to={`/artikler/${article.articleSlug.current}`}
                                >
                                    <h2 className="mt-0 group-hover:underline">
                                        {article.articleTitle}
                                    </h2>
                                </Link>
                                <p>{article.articleDescription}</p>
                                <Link
                                    className="underline w-fit md:mt-40"
                                    to={`/artikler/${article.articleSlug.current}`}
                                >
                                    <p>Les mer</p>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Layout>
    );
};

export default ArticlesOverview;
