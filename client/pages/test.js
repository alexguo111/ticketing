import Router from 'next/router'

const Test = () => {
    console.log("TEST");
    return (
        <div>
            <h1>Test</h1>
            <button onClick={() => Router.push('/')}>Go to Another Page</button>
        </div>
    )
}

Test.getInitialProps = () => {
    console.log("Test initial Props")
    return {}
}

export default Test