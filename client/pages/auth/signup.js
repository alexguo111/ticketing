import { useState } from 'react'
import useRequest from '../../hooks/use-request';
import Router from 'next/router'

const signUp = (props) => {

    console.log("signUp")
    console.log("Props in signup->", props)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: { email, password },
        onSuccess: (data) => Router.push("/")
    })

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        doRequest();

    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input value={email} className="form-control" onChange={onEmailChange} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordChange} className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}
export default signUp

