import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './ResetPassSend.css';
import { useHTTP } from '../../../shared/hooks/http-hook';
import { handleLoading } from '../../utils/is-loading';


const ResetPassSend = () => {
    const { isLoading, error, sendRequest, clearError } = useHTTP();
    const [submitted, setSubmitted] = useState(false)

    const handleResend = async (email) => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users/resetpass`,
            'POST',
            JSON.stringify({
                email
            }),
            {
                'Content-Type': 'application/json'
            }
            );
            clearError();
            setSubmitted(true);
        } catch (err) {
            console.log(err, 'failed to do the http thing while reseding.')
        }
    }

    return (
        <div className="reset-pass-container">
            <div className="reset-inner-container">
                {submitted && <div className="reset-confirmation-label">Go check your email</div>}
                {isLoading && <div className="reset-form-container">{handleLoading()}</div>}
                {!submitted && !isLoading && <div className="reset-pass-inner-container">
                    <Formik
                        initialValues={{email: ''}}
                        validationSchema={Yup.object({
                            email: Yup.string()
                            .email('Invalid email address')
                            .required('Required')
                            .test('email', 'Email not found. Try signin in with Google.', function(value) {
                                return new Promise((resolve, reject) => {
                                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/checkloginemail/${value}`)
                                        .then((res) => {
                                            resolve(true)
                                        })
                                        .catch((error) => {
                                            resolve(false)
                                        })
                                })
                                })
                        })}
                        validateOnChange={false}
                        onSubmit={(values) => {
                            handleResend(values.email)
                        }}
                    >
                    <Form className="reset-form-container">
                            <div className="reset-input-container">
                                <label className="reset-input-label" htmlFor="email">Email</label>
                                <Field className="reset-input-field" name="email" type="email" />
                                <ErrorMessage name="email" >
                                    {msg => <div className="input-error">{msg}</div>}
                                </ErrorMessage>
                            </div>
                            <button className="reset-pass-button" type="submit">Send Reset Link</button>
                    </Form>
                    </Formik>
                </div>}
            </div>
        </div>
    )
}

export default ResetPassSend;