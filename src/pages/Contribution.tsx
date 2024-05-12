import { useEffect, useState } from 'react';
import Layout from '../components/Layout.tsx';
import { useParams } from 'react-router-dom';
import { getContribution, urlFor } from '../lib/sanity.ts';
import type { Contribution } from '../lib/types.ts';

const Contribution = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [contribution, setContribution] = useState<Contribution>();

    useEffect(() => {
        if (params.id) {
            getContribution(params.id)
                .then((response) => {
                    console.log(response);
                    setContribution(response);
                })
                .finally(() => setIsLoading(false));
        }
    }, []);

    return (
        <Layout>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {contribution && (
                        <div className="flex flex-row gap-x-8">
                            <div>
                                <img
                                    className={'w-full'}
                                    src={urlFor(contribution.image).url()}
                                    alt={contribution.title}
                                />
                            </div>
                            <div className="flex flex-col max-w-[560px] w-full">
                                <h1 className="mt-0">{contribution.title}</h1>
                                <p>
                                    {contribution.location},{' '}
                                    {contribution.category}
                                </p>
                                <p>{contribution.description}</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
};

export default Contribution;
