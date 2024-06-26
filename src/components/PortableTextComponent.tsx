import { PortableTextComponents } from '@portabletext/react';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';

const PortableTextComponent: PortableTextComponents = {
    types: {
        image: ({
            value
        }: {
            value: {
                _type: string;
                asset: SanityAsset;
                imageCaption: string;
                imageAlt: string;
            };
        }) => {
            return (
                <div className="my-10">
                    <img
                        className="max-w-100 max-h-[50vh]"
                        src={urlFor(value.asset).url() || ''}
                        alt={value.imageAlt ?? ''}
                    />
                    <p className="text-2xl italic">{value.imageCaption}</p>
                </div>
            );
        }
    },
    marks: {
        link: ({ children, value }) => {
            return (
                <Link className="underline" to={value.href}>
                    {children}
                </Link>
            );
        }
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc ml-6 list-inside">{children}</ul>
        )
    },
    block: {
        normal: ({ children }) => <p className="my-6">{children}</p>
    }
};

export default PortableTextComponent;
