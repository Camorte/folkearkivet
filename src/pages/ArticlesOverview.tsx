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
                console.log(response);
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
                            className="flex flex-row gap-x-8"
                        >
                            <Link
                                to={`/artikler/${article.articleSlug.current}`}
                            >
                                {article.articleImage ? (
                                    <img
                                        className="border-2 max-w-[400px]"
                                        src={urlFor(article.articleImage).url()}
                                        alt={article.articleTitle}
                                    />
                                ) : (
                                    <div className="w-[400px] h-[400px] border-2"></div>
                                )}
                            </Link>
                            <div className="flex flex-col">
                                <h2 className="mt-0">{article.articleTitle}</h2>
                                <p>{article.articleDescription}</p>
                                <Link
                                    className="underline mt-40"
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