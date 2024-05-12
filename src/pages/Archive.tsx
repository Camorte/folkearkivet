import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { getContributions, urlFor } from '../lib/sanity.ts';
import { Contribution, ContributionOverview } from '../lib/types.ts';
import { Link } from 'react-router-dom';

const Archive = () => {
    const [archive, setArchive] = useState<ContributionOverview[]>([]);

    useEffect(() => {
        getContributions()
            .then((data: Contribution[]) => {
                setArchive(data);
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
                        key={contribution._id + '-' + index}
                        className="row-[span_2/auto] col-span-[span_2/auto]"
                    >
                        <Link to={`/arkivet/${contribution._id}`}>
                            <img
                                className="object-fit"
                                src={urlFor(contribution.image).url()}
                                alt={contribution.title}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default Archive;
