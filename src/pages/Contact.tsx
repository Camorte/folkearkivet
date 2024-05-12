import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { StandardArticle } from '../lib/types.ts';
import { getContact } from '../lib/sanity.ts';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '../components/PortableTextComponent.tsx';

const Contact = () => {
    const [contact, setContact] = useState<StandardArticle | undefined>();

    useEffect(() => {
        getContact()
            .then((data: StandardArticle) => {
                setContact(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Layout>
            {contact && (
                <div>
                    <h1>{contact.title}</h1>
                    <PortableText
                        value={contact.content}
                        components={PortableTextComponent}
                    />
                </div>
            )}
        </Layout>
    );
};

export default Contact;
