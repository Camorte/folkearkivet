import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { StandardArticle } from '../lib/types.ts';
import { getBiography } from '../lib/sanity.ts';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '../components/PortableTextComponent.tsx';

const About = () => {
    const [biography, setBiography] = useState<StandardArticle | undefined>();

    useEffect(() => {
        getBiography()
            .then((data: StandardArticle) => {
                setBiography(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Layout>
            {biography && (
                <div>
                    <h1>{biography.title}</h1>
                    <PortableText
                        value={biography.content}
                        components={PortableTextComponent}
                    />
                </div>
            )}
        </Layout>
    );
};

export default About;
