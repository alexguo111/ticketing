import 'bootstrap/dist/css/bootstrap.css'
import getCustomClient from '../api/build-client'
import Header from '../component/header'


const KK = ({ Component, pageProps, currentUser }) => {
    console.log("APP")
    // console.log("APP Component->", Component)
    // console.log("APP pageProps->", pageProps)
    return (
        <div>
            <Header currentUser={currentUser} />
            <div className='container'>
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </div>
    )
}

KK.getInitialProps = async (context) => {
    console.log("APP get initial Props")
    const client = getCustomClient(context.ctx);
    const { data } = await client.get("/api/users/currentuser");

    let pageProps = {};
    if (context.Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(context.ctx, client, data.currentUser)
        // console.log("pageProps Here->", pageProps);
    }
    // console.log("DATA->", data);
    // console.log("Page Props->", pageProps);
    return {
        pageProps,
        ...data
    }
}

export default KK