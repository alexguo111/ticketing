import axios from 'axios'
import { useState } from 'react'

const useRequest = ({ url, method, body, onSuccess }) => {
    console.log("useRequest Hook")
    const [errors, setErrors] = useState(null);

    const doRequest = async (paras = {}) => {
        try {
            console.log("making request")
            console.log("paras=>", paras);
            console.log("params->", { ...body, ...paras })
            setErrors(null)
            const response = await axios[method](url, { ...body, ...paras });
            if (onSuccess) {
                onSuccess(response.data)
            }
        } catch (e) {
            console.log("e.response.data.errors->", e.response.data.errors)
            setErrors(
                <div className='alert alert-danger'>
                    <h4>Ooops...</h4>
                    <ul className='my-0'>
                        {e.response.data.errors.map(e => <li key={e.message}>{e.message}</li>)}
                    </ul>
                </div>
            );
        }
    }

    return { doRequest, errors };
}

export default useRequest