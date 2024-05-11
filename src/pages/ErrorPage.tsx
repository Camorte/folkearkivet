import Layout from '../components/Layout.tsx';

const ErrorPage = () => {
    return (
        <Layout>
            <div>
                <h2 className="font-normal">
                    Woops! Noe har gått galt - Ser ikke ut som denne siden
                    eksisterer
                </h2>
            </div>
        </Layout>
    );
};

export default ErrorPage;
