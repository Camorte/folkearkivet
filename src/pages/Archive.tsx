import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { getContributions, urlFor } from '../lib/sanity.ts';
import { Contribution } from '../lib/types.ts';

const Archive = () => {
    const [archive, setArchive] = useState<Contribution[]>([]);
    const [selectedContribution, setSelectedContribution] =
        useState<Contribution>();
    const [showContribution, setShowContribution] = useState(false);

    useEffect(() => {
        getContributions()
            .then((data: Contribution[]) => {
                setArchive(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Layout>
            <ul className="grid grid-cols-4 grid-flow-dense auto-rows-auto gap-[6px]">
                {archive.map((contribution, index) => (
                    <li
                        key={contribution.title + '-' + index}
                        className="row-[span_2/auto] col-span-[span_2/auto]"
                    >
                        <img
                            className="object-fit"
                            src={urlFor(contribution.image).url()}
                            alt={contribution.title}
                        />
                    </li>
                ))}
            </ul>
            {selectedContribution && (
                <div
                    className={`flex flex-col w-full h-full fixed top-0 left-0 z-10 bg-black container ${showContribution ? 'animate-fade-in' : 'animate-fade-out'}`}
                >
                    <button
                        className="self-end"
                        onClick={() => {
                            setShowContribution(false);
                        }}
                    >
                        Close
                    </button>
                    <div className="flex flex-row">
                        <img
                            className="max-w-[800px]"
                            src={urlFor(selectedContribution.image).url()}
                            alt={selectedContribution.title}
                        />
                        <div className="flex flex-col ml-8">
                            <h1>{selectedContribution.title}</h1>
                            <p>{selectedContribution.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Archive;
