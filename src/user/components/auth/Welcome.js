import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Resend from './Resend';
import LoginForm from './LoginForm';
import { useHTTP } from '../../../shared/hooks/http-hook';
import './Welcome.css';

const Welcome = () => {
    const { sendRequest } = useHTTP();
    const [status, setStatus] = useState(false);
    const { confirmationCode } = useParams();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users/confirm/${confirmationCode}`)
                setStatus(responseData)
            } catch (err) {
                console.log(err, 'failed to verify...')
            }
        }
        verifyUser();
       
    }, [])
   

    if (status) {
        return (
            <div className="welcome-container">
                <p className="welcome-text">Thanks for confirming your email! Login below.</p>
                <LoginForm />
            </div>
        )
    } else {
         return (
        <div className="welcome-container">
            <div className="welcome-text">
                Failed to verify. 
            </div>
            <div>
                <Resend />
            </div>
        </div>
         )
    }

}

export default Welcome;