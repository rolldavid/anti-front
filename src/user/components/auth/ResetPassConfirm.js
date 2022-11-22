import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { useHTTP } from "../../../shared/hooks/http-hook";
import { handleLoading } from "../../utils/is-loading";
import './ResetPassConfirm.css';
import LoginForm from "./LoginForm";

const ResetPassConfirm = () => {
    const { isLoading, error, sendRequest, clearError } = useHTTP();
    const [isUser, setIsUser] = useState(false);
    const { confirmationCode } = useParams();
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users/confirm/${confirmationCode}`)
                setIsUser(true)
                setEmail(responseData.email)
            } catch (err) {
                console.log(err, 'failed to verify...')
            }
        }
        verifyUser();
       
    },[])


    const handlePasswordUpdate = async (password) => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users/updatepass`,
            'POST',
            JSON.stringify({
                password,
                email
            }),
            {
                'Content-Type': 'application/json'
            }
            );
            setSubmitted(true);
            clearError();
        } catch (err) {
            console.log(err, 'failed to do the http thing.')
        }
    }

    return (
        <div className="new-pass-container">
            {submitted && isUser && <div className="new-input-label">
                    Password has been updated! Login below.
            </div>}
            {submitted && isUser && <LoginForm />}
            {!submitted && !isLoading && !isUser && <div className="new-inner-container">
                 <div className="new-form-container">
                    <div className="new-input-label">
                        Your took too long to reset...
                    </div>
                    <div className="new-pass-container-link">
                            <Link to="/resetpass" className="new-forgot-pass-text">
                                <button className="new-pass-button" type="submit">Get New Link</button>
                            </Link>
                    </div>
                </div>
            </div>}

            {isLoading && <div className="new-form-container">{handleLoading()}</div>}
            {!submitted && isUser && <div className="new-inner-container">
                    <Formik 
                        initialValues={{password: '', passwordConf: ''}}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .min(6, 'Must be at least 6 characters')
                                .max(30, 'Must be 30 characters or less')
                                .required('Required'),
                            passwordConf: Yup.string()
                                .min(6, 'Must be at least 6 characters')
                                .max(30, 'Must be 30 characters or less')
                                .required('Required')
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        })}
                        validateOnChange={false}
                        onSubmit={(values) => {
                            handlePasswordUpdate(values.password)
                        }}
                    >
                    <Form className="new-form-container">
                            <div className="new-input-container">
                                <label className="new-input-label" htmlFor="password">New Password</label>
                                <Field className="new-input-field" name="password" type="text" />
                                <ErrorMessage name="password" >
                                    {msg => <div className="input-error">{msg}</div>}
                                </ErrorMessage>
                            </div>
                            <div className="new-input-container">
                                <label className="new-input-label" htmlFor="passwordConf">Confirm Password</label>
                                <Field className="new-input-field" name="passwordConf" type="text" />
                                <ErrorMessage name="passwordConf" >
                                    {msg => <div className="input-error">{msg}</div>}
                                </ErrorMessage>
                            </div>
                            <button className="new-pass-button" type="submit">Reset Password</button>
                    </Form>
                    </Formik>
                </div>}
        </div>
        )
    
}

export default ResetPassConfirm;