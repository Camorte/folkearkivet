import Layout from '../components/Layout.tsx';

const ErrorPage = () => {
    return (
        <Layout>
            <div>
                <h1>Woops! Noe har gått galt</h1>
                <h2 className="font-normal">
                    Denne siden eksisterer kanskje ikke, eller så har det skjedd
                    en feil.
                </h2>
            </div>
        </Layout>
    );
};

export default ErrorPage;
