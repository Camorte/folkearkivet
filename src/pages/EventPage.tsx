import { PortableText } from '@portabletext/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PortableTextComponent from '../components/PortableTextComponent.tsx';
import { getEvent } from '../lib/sanity';
import { Event } from '../lib/types';
import ErrorPage from './ErrorPage';

const EventPage = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState<Event>();

    useEffect(() => {
        if (params.event) {
            getEvent(params.event)
                .then((response) => {
                    setEvent(response);
                })
                .finally(() => setIsLoading(false));
        }
    }, [params]);

    if (!isLoading && event) {
        return (
            <Layout>
                {Object.keys(event).length === 0 ? (
                    <ErrorPage />
                ) : (
                    <div>
                        <h1>{event.title}</h1>
                        <div className="my-10">
                            <PortableText
                                value={event.content}
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

export default EventPage;
