import Router from 'next/router';
import Link from 'next/link'

const LandingPage = ({ currentUser, tickets }) => {
    console.log("INDEX PAGE")
    console.log("currentUser->", currentUser);
    console.log("tickets->", tickets);

    const ticketList = tickets.map(ticket => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    {/* <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}> */}
                    <Link href={`/tickets/${ticket.id}`} >
                        View
                    </Link>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <h1>Tickets</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketList}
                </tbody>
            </table>
        </div>
    )
    // return (<div>
    //     {currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>}
    //     <button onClick={() => Router.push('/test')}>Go to Another Page</button>
    // </div>)

}

LandingPage.getInitialProps = async (context, client, currentUser) => {
    console.log("LandingPage Component get initial Props->")
    const { data } = await client.get('/api/tickets');
    return { tickets: data };
}

export default LandingPage