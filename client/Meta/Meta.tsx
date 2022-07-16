import Head from 'next/head'

const Meta = ({ title, keywords, description }: any) => {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Simulator',
    keywords: 'web development, programming',
    description: `S3RBVN's portofolio website `
}

export default Meta
