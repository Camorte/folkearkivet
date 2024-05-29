import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { getProgram, urlFor } from '../lib/sanity.ts';
import { ProgramOverview } from '../lib/types.ts';

const Program = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [program, setProgram] = useState<ProgramOverview[]>([]);

    useEffect(() => {
        getProgram()
            .then((response) => {
                setProgram(response);
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
                    {program.map((event, index) => (
                        <li
                            key={event.title + '-' + index}
                            className="flex flex-col gap-y-4 md:gap-y-0 md:grid md:grid-cols-3 md:gap-x-4"
                        >
                            {event.image ? (
                                <img
                                    className="w-full border-2 max-w-[400px]"
                                    src={urlFor(event.image).url()}
                                    alt={event.title}
                                />
                            ) : (
                                <div className="w-full max-w-[400px] max-h-[400px] border-2"></div>
                            )}
                            <div className="flex flex-col">
                                <h2 className="m-0">{event.title}</h2>
                                <p>{event.info}</p>
                            </div>
                            <div>
                                <h2 className="m-0">Om arrangementet</h2>
                                <p>{event.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Layout>
    );
};

export default Program;
