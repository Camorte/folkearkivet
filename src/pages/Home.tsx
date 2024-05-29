import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { getLandingPage, urlFor } from '../lib/sanity.ts';
import { LandingPage } from '../lib/types.ts';
import { Link } from 'react-router-dom';

function Home() {
    const [landingPage, setLandingPage] = useState<LandingPage>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getLandingPage()
            .then((response: LandingPage) => {
                setLandingPage(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <Layout>
            {isLoading ? (
                <p>Laster inn...</p>
            ) : (
                <>
                    {landingPage && (
                        <div className="flex flex-col">
                            <Link
                                className="hover:cursor-pointer w-fit group"
                                to={`/program`}
                            >
                                <img
                                    className="w-full max-w-[600px]"
                                    src={urlFor(landingPage.image).url()}
                                    alt={landingPage.title}
                                />
                                <h1 className="group-hover:underline">
                                    {landingPage.title}
                                </h1>
                            </Link>
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
}

export default Home;
