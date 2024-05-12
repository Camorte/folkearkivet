import { PortableText } from '@portabletext/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PortableTextComponent from '../components/PortableTextComponent.tsx';
import { getArticle } from '../lib/sanity';
import { Article } from '../lib/types';
import ErrorPage from './ErrorPage';

const ArticlePage = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState<Article>();

    useEffect(() => {
        if (params.article) {
            getArticle(params.article).then((response) => {
                setIsLoading(false);
                setArticle(response);
            });
        }
    }, [params]);

    if (!isLoading && article) {
        return (
            <Layout>
                {Object.keys(article).length === 0 ? (
                    <ErrorPage />
                ) : (
                    <div>
                        <h1>{article.articleTitle}</h1>
                        <div className="my-10">
                            <PortableText
                                value={article.content}
                                components={PortableTextComponent}
                            />
                        </div>
                    </div>
                )}
            </Layout>
        );
    }
    return <Layout>{isLoading && <p>Loading...</p>}</Layout>;
};

export default ArticlePage;
