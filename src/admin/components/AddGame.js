import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { Navigate, Link } from 'react-router-dom'; 

import { useHTTP } from '../../shared/hooks/http-hook';
import Emoji from '../utils/Emoji';

import './AddGame.css'

let scategory;
let sq1prompt;
let sq1solution;
let sq1fake;
let sq1deepfake;
let sq1source;
let sq2prompt;
let sq2solution;
let sq2fake;
let sq2deepfake;
let sq2source;; 
let sq3prompt;
let sq3solution;
let sq3fake;
let sq3deepfake;
let sq3source; 

let scleverTitle;

const AddGame = ({ review, doneReviewing, initQ0, setInitQ0, initQ1, setInitQ1, initQ2, setInitQ2, initQ3, setInitQ3, author, gameId }) => {
    console.log(doneReviewing)
    const { isLoading, error, clearError, sendRequest } = useHTTP();
    const [q0Submitted, setQ0Submitted] = useState(false);
    const [q1Submitted, setQ1Submitted] = useState(false);
    const [q2Submitted, setQ2Submitted] = useState(false);
    const [q3Submitted, setQ3Submitted] = useState(false);
    const [q4Submitted, setQ4Submitted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reload, setReload] = useState(false);

    let fullname;
    
    if (localStorage.getItem('userData')) {
        const localInfo = JSON.parse(localStorage.getItem('userData'));

        if (!review) {
        fullname = localInfo.fullname;
        } else {
            fullname = author;
        }
    }

    const handleReload = () => {
            window.location.reload();
        }
    
    const handleSubmitQ0 = (
        category
    ) => {
        setInitQ0({
            category
        })
        setQ0Submitted(true);
        scategory = category;
    }

    const backToQ0 = () => {
        setQ0Submitted(false)
    }


    const handleSubmitQ1 = (
        q1prompt,
        q1solution,
        q1fake, 
        q1deepfake,
        q1source
    ) => {
        setInitQ1({
            q1prompt,
            q1solution,
            q1fake, 
            q1deepfake,
            q1source
        })
        setQ1Submitted(true);
        sq1prompt = q1prompt;
        sq1solution = q1solution;
        sq1fake = q1fake;
        sq1deepfake = q1deepfake;
        if (q1source) {
            sq1source = q1source
        } else {
            sq1source = 'none'
        }
    
    }

    const backToQ1 = () => {
        setQ1Submitted(false)
    }

    const handleSubmitQ2 = (
        q2prompt,
        q2solution,
        q2fake,
        q2deepfake,
        q2source
        
    ) => {
        setInitQ2({
            q2prompt,
            q2solution,
            q2fake, 
            q2deepfake,
            q2source
        })
        setQ2Submitted(true);
        sq2prompt = q2prompt;
        sq2solution = q2solution;
        sq2fake = q2fake;
        sq2deepfake = q2deepfake;
        if (q2source) {
            sq2source = q2source
        } else {
            sq2source = 'none'
        }
    }

    const backToQ2 = () => {
        setQ2Submitted(false)
    }

    const handleSubmitQ3 = (
        q3prompt,
        q3solution,
        q3fake,
        q3deepfake,
        q3source
    ) => {
        setInitQ3({
            q3prompt,
            q3solution,
            q3fake, 
            q3deepfake,
            q3source
        })
        setQ3Submitted(true);
        sq3prompt = q3prompt;
        sq3solution = q3solution;
        sq3fake = q3fake;
        sq3deepfake = q3deepfake;
        if (q3source) {
            sq3source = q3source
        } else {
            sq3source = 'none'
        }

        if (!review) {
            submitGame();
        } 
    }

    const backToQ3 = () => {
        setQ3Submitted(false)
    }

    const handleSubmitQ4 = (
        cleverTitle
    ) => {
        setQ4Submitted(true);
        scleverTitle = cleverTitle;
        updateGame();
    }

    const submitGame = async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/newgame`,
            'POST',
            JSON.stringify({
                scategory,
                sauthor: fullname,
                sq1prompt,
                sq1solution,
                sq1fake,
                sq1deepfake,
                sq1source, 
                sq2prompt,
                sq2solution,
                sq2fake,
                sq2deepfake,
                sq2source,
                sq3prompt,
                sq3solution,
                sq3fake,
                sq3deepfake,
                sq3source
            }),
            {
                'Content-Type': 'application/json'
            }
            );

            setSubmitted(true)

        } catch (err) {
            console.log(err, 'failed to submit game...')
        }
    }

    const updateGame = async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/updategame`,
            'POST',
            JSON.stringify({
                gameId,
                scategory,
                scleverTitle,
                sauthor: fullname,
                sq1prompt,
                sq1solution,
                sq1fake,
                sq1deepfake,
                sq1source,
                sq2prompt,
                sq2solution,
                sq2fake,
                sq2deepfake,
                sq2source,
                sq3prompt,
                sq3solution,
                sq3fake,
                sq3deepfake,
                sq3source
            }),
            {
                'Content-Type': 'application/json'
            }
            );

            setSubmitted(true)

        } catch (err) {
            console.log(err, 'failed to update game...')
        }
    }

    return (
        <div className="add-game-main">
            
            {!doneReviewing && !q0Submitted && <div className="add-game-container">
                {!doneReviewing && review && <div className="author">
                    <p>These questions were submitted by {author}</p>
                    <p>Select this category below: <strong>{initQ0.category}</strong></p>
                </div>}
                <Formik
                    initialValues={{ 
                        category: initQ0.category
                        }}
                    validationSchema={Yup.object({
                        category: 
                            Yup.string()
                            .required('Required')
                    })}
                    validateOnChange={false}
                    onSubmit={(values) => {
                        handleSubmitQ0(
                            values.category
                        )
                    }}
                    >
                    
                    <Form className="add-game-inner-container">
                        <div className="add-game-title-container">
                            {!review && <h3 className="add-game-subtitle">{`Let's add some questions 🔥`}</h3>}
                            {review && <h3 className="add-game-subtitle">Let's do some review!</h3>}
                        </div>
                        {!review && <div className="add-game-tip-container-hi">
                            <p className="add-game-tip">
                                <span className="tip-text">
                                    {`Hi there! `} 
                                </span> 
                                {`You'll be asked to enter three questions with increased difficulty, each with one correct answer and two incorrect answers (games are multiple choice). All three questions should fall within one general category.`}
                            </p>
                        </div>}
                        <div className="add-game-input-container-dropdown">
                            <label className="add-game-input-label" htmlFor="category"></label>
                            <Field as="select" name="category" className="category-select-container">
                                <option value="Select a Category" label="Select a Category">Select a Category</option>
                                <option value="Climate" label="Climate">Climate</option>
                                <option value="Colonialism" label="Colonialism">Colonialism</option>
                                <option value="Creative Production" label="Creative Production">Creative Production</option>
                                <option value="Crime & Punishment" label="Crime & Punishment">Crime & Punishment</option>
                                <option value="Gender" label="Gender & Sexuality">Gender & Sexuality</option>
                                <option value="Geography" label="Geography">Geography</option>
                                <option value="Global Cultures" label="Global Cultures">Global Culture</option>
                                <option value="Handcrafts" label="Handcrafts">Handcrafts</option>
                                <option value="History" label="History">History</option>
                                <option value="Health" label="Health">Health</option>
                                <option value="Labor Power" label="Labor">Labor</option>
                                <option value="Media" label="Media">Media</option>
                                <option value="Physical Science" label="Physical Science">Physical Science</option>
                                <option value="Political Economy" label="Political Economy">Political Economy</option>
                                <option value="Political Structures" label="Political Structures">Political Structures</option>
                                <option value="Quality of Life" label="Quality of Life">Quality of Life</option>
                                <option value="Race" label="Race">Race</option>
                                <option value="Social Science" label="Social Science">Social Science</option>
                                <option value="Technology" label="Technology">Technology</option>

                            </Field>
                            <ErrorMessage name="category" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        
                            <button className="next-button" type="submit">NEXT</button>
                            <p className="add-game-steps">{review ? `Step 1 of 5` : `Step 1 of 4`}</p>
                    </Form>
                </Formik>
                
            </div>}
            {!doneReviewing && q0Submitted && !q1Submitted && <div className="add-game-container">
                <Formik
                    initialValues={{ 
                        q1prompt: initQ1.q1prompt,
                        q1solution: initQ1.q1solution,
                        q1fake: initQ1.q1fake, 
                        q1deepfake: initQ1.q1deepfake,
                        q1source: initQ1.q1source
                        }}
                    validationSchema={Yup.object({
                        q1prompt: 
                            Yup.string()
                            .min(10, 'Must be at least 10 characters')
                            .max(125, 'Must be 125 characters or less')
                            .required('Required'),
                        q1solution: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q1fake: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q1deepfake: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q1source: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(200, 'Must be 200 characters or less')
                    })}
                    validateOnChange={false}
                    onSubmit={(values) => {
                        handleSubmitQ1(
                            values.q1prompt,
                            values.q1solution, 
                            values.q1fake,
                            values.q1deepfake,
                            values.q1source
                        )
                    }}
                    >

                    <Form className="add-game-inner-container">
                        <div className="add-game-title-container">
                            <h2 className="add-game-title">First Question</h2>
                            <h3 className="add-game-subtitle">Easy</h3>
                        </div>
                        <div className="add-game-tip-container">
                            <p className="add-game-tip">
                                <span className="tip-text">
                                    {`Tip: `} 
                                </span> 
                                Think of an intro 101 class question on your subject. For example, which president passed the New Deal? Ideal questions lead to a 1-2 word answer.  
                            </p>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q1prompt">{`Question`}</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q1prompt" type="text" />
                            <ErrorMessage name="q1prompt" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q1solution">Correct Answer</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q1solution" type="text" />
                            <ErrorMessage name="q1solution" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q1fake">Incorrect Answer A</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q1fake" type="text" placeholder=""/>
                            <ErrorMessage name="q1fake" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q1deepfake">Incorrect Answer B</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q1deepfake" type="text" />
                            <ErrorMessage name="q1deepfake" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q1source">{`Relevant Source (optional)`}</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q1source" type="text" placeholder="Link to article, book, wikipedia, etc" />
                            <ErrorMessage name="q1source" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="form-buttons-container">
                            <button className="next-button" type="button" onClick={backToQ0}>BACK</button>
                            <button className="next-button" type="submit">NEXT</button>
                        </div>
                        <p className="add-game-steps">{review ? `Step 2 of 5` : `Step 2 of 4`}</p>
                    </Form>
                </Formik>
            </div>}

            {!doneReviewing && q1Submitted && !q2Submitted && <div className="add-game-container">
                <Formik
                    initialValues={{ 
                        q2prompt: initQ2.q2prompt,
                        q2solution: initQ2.q2solution,
                        q2fake: initQ2.q2fake, 
                        q2deepfake: initQ2.q2deepfake,
                        q2source: initQ2.q2source
                        }}
                    validationSchema={Yup.object({
                        q2prompt: 
                            Yup.string()
                            .min(10, 'Must be at least 10 characters')
                            .max(125, 'Must be 125 characters or less')
                            .required('Required'),
                        q2solution: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q2fake: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q2deepfake: 
                        Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q2source: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(200, 'Must be 200 characters or less')
                        
                    })}
                    validateOnChange={false}
                    onSubmit={(values) => {
                        handleSubmitQ2(
                            values.q2prompt,
                            values.q2solution, 
                            values.q2fake,
                            values.q2deepfake,
                            values.q2source
                        )
                    }}
                    >                    
                    <Form className="add-game-inner-container">
                        <div className="add-game-title-container">
                            <h2 className="add-game-title">Second Question</h2>
                            <h3 className="add-game-subtitle">Medium</h3>
                        </div>
                        <div className="add-game-tip-container">
                            <p className="add-game-tip">
                                <span className="tip-text">
                                    {`Tip: `} 
                                </span> 
                                Turn up the heat. For example, what year did wikileaks publish the Afghanistan war logs?   
                            </p>
                        </div>
                        
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q2prompt">Question</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q2prompt" type="text" />
                            <ErrorMessage name="q2prompt" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q2solution">Correct Answer</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q2solution" type="text" />
                            <ErrorMessage name="q2solution" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q2fake">Incorrect Answer A</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q2fake" type="text" />
                            <ErrorMessage name="q2fake" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q2deepfake">Incorrect Answer B</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q2deepfake" type="text" />
                            <ErrorMessage name="q2deepfake" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q2source">{`Relevant Source (optional)`}</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q2source" type="text" placeholder="Link to article, book, wikipedia, etc"/>
                            <ErrorMessage name="q2source" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="form-buttons-container">
                            <button className="next-button" type="button" onClick={backToQ1}>BACK</button>
                            <button className="next-button" type="submit">NEXT</button>
                        </div>
                        <p className="add-game-steps">{review ? `Step 3 of 5` : `Step 3 of 4`}</p>
                    </Form>
                </Formik>
            </div>}
            {!doneReviewing && q2Submitted && !q3Submitted && <div className="add-game-container">
                <Formik
                    initialValues={{ 
                        q3prompt: initQ3.q3prompt,
                        q3solution: initQ3.q3solution,
                        q3fake: initQ3.q3fake, 
                        q3deepfake: initQ3.q3deepfake,
                        q3source: initQ3.q3source
                        }}
                    validationSchema={Yup.object({
                        q3prompt: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(125, 'Must be 125 characters or less')
                            .required('Required'),
                        q3solution: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q3fake: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q3deepfake: 
                        Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(50, 'Must be 50 characters or less')
                            .required('Required'),
                        q3source: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(200, 'Must be 200 characters or less')
                    })}
                    validateOnChange={false}
                    onSubmit={(values) => {
                        handleSubmitQ3(
                            values.q3prompt,
                            values.q3solution, 
                            values.q3fake,
                            values.q3deepfake,
                            values.q3source
                        )
                    }}
                    >
                    <Form className="add-game-inner-container">
                        <div className="add-game-title-container">
                            <h2 className="add-game-title">Third Question</h2>
                            <h3 className="add-game-subtitle">Hard</h3>
                        </div>
                        <div className="add-game-tip-container">
                            <p className="add-game-tip">
                                <span className="tip-text">
                                    {`Tip: `} 
                                </span> 
                                Think of a lesser-known fact that you think is important for people to know. For example, who wrote "Cartucho: Tales of the Struggle in Northern Mexico", published in 1931.   
                            </p>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q3prompt">Question</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q3prompt" type="text" />
                            <ErrorMessage name="q3prompt" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q3solution">Correct Answer</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q3solution" type="text" />
                            <ErrorMessage name="q3solution" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q3fake">Incorrect Answer A</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q3fake" type="text" />
                            <ErrorMessage name="q3fake" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q3deepfake">Incorrect Answer B</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q3deepfake" type="text" />
                            <ErrorMessage name="q3deepfake" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="q3source">{`Relevant Source (optional)`}</label>
                            <Field as="input" size="75" className="add-game-input-field" name="q3source" type="text" placeholder="Link to article, book, wikipedia, etc"/>
                            <ErrorMessage name="q3source" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        {!review && <div className="add-game-note-container">
                            <p className="add-game-tip">
                                <span className="tip-text">
                                    {`Note: `} 
                                </span> 
                                The Antitrivia team will review these questions for formatting and might edit or format for better gameplay. We'll also assign a clever category title based on your questions.
                            </p>
                        </div>}
                        <div className="form-buttons-container">
                            
                            <button className="next-button" type="button" onClick={backToQ2}>BACK</button>
                            <button className="next-button" type="submit">{review ? `NEXT` : `SUBMIT`}</button>
                        </div>
                        <p className="add-game-steps">{review ? `Step 4 of 5` : `Step 4 of 4`}</p>
                    </Form>
                </Formik>
            
            </div>}

            {!doneReviewing && review && q3Submitted && !q4Submitted && <div className="add-game-container">
                <Formik
                    initialValues={{ 
                        cleverTitle: initQ0.category,
                        }}
                    validationSchema={Yup.object({
                        cleverTitle: 
                            Yup.string()
                            .min(1, 'Must be at least 1 character')
                            .max(125, 'Must be 125 characters or less')
                            .required('Required')
                    })}
                    validateOnChange={false}
                    onSubmit={(values) => {
                        handleSubmitQ4(
                            values.cleverTitle
                        )
                    }}
                    >
                    <Form className="add-game-inner-container">
                        <div className="add-game-tip-container">
                            <p className="add-game-tip">
                                <span className="tip-text">
                                    {`Clever Title: `} 
                                </span> 
                                Think of a clever title that signals the type of category and sums up the types of questions.
                            </p>
                        </div>
                        <div className="add-game-input-container">
                            <label className="add-game-input-label" htmlFor="cleverTitle">Clever Title</label>
                            <Field as="input" size="75" className="add-game-input-field" name="cleverTitle" type="text" />
                            <ErrorMessage name="cleverTitle" >
                                {msg => <div className="add-game-error">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        
                        <div className="form-buttons-container">
                            <button className="next-button" type="button" onClick={backToQ3}>back</button>
                            <button className="next-button" type="submit">SUBMIT</button>
                        </div>
                        <p className="add-game-steps">Step 5 of 5</p>
                    </Form>
                </Formik>
            
            </div>}
            {!doneReviewing && !review && submitted && <div className="add-game-container">
                <div className="thanks-for-submitting">
                    <p>Thanks for submitting!</p>       
                    <div className="add-more-button" onClick={handleReload}>ADD MORE QUESTIONS</div>
                </div>
            </div>}

            {!doneReviewing && review && submitted && <div className="add-game-container">
                <div className="thanks-for-submitting">
                    <p>Thanks for submitting!</p>   
                    <p className="notify-text">
                        {`You're doing great! Keep it up :)`}
                    </p>
                    <div className="add-more-button" onClick={handleReload}>REVIEW MORE QUESTIONS</div>
                </div>
            </div>}

            {doneReviewing && <div className="add-game-container">
                <div className="thanks-for-submitting">
                    <p>Nothing left to review!</p>   
                    <p className="notify-text">
                        {`You're doing great! Keep it up :)`}
                    </p>
                </div>
            </div>}
        </div>
    )
}

export default AddGame;