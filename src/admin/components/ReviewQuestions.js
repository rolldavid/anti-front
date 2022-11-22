import { useState, useEffect } from 'react';
import { useHTTP } from '../../shared/hooks/http-hook';

import AddGame from './AddGame';
import './ReviewQuestions.css';

const ReviewQuestions = () => {
    const { isLoading, error, clearError, sendRequest } = useHTTP();

    const [author, setAuthor] = useState('');
    const [gameId, setGameId] = useState('')
    const [doneReviewing, setDoneReviewing] = useState(false)
  
    const [initQ0, setInitQ0] = useState({
        category: ''
    })

    const [initQ1, setInitQ1] = useState({
        q1prompt: '',
        q1solution: '',
        q1fake: '', 
        q1deepfake: '',
        q1source: ''
    })

    const [initQ2, setInitQ2] = useState({
        q2prompt: '',
        q2solution: '',
        q2fake: '', 
        q2deepfake: '',
        q2source: ''
    })

    const [initQ3, setInitQ3] = useState({
        q3prompt: '',
        q3solution: '',
        q3fake: '', 
        q3deepfake: '',
        q3source: ''
    })

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/getquestions`)
                
                if (!responseData.status) {
                    setDoneReviewing(true)
                    return;
                }

                const category = responseData.category;

                setInitQ0({
                    category: category.category
                })

                setInitQ1({
                    q1prompt: category.q1.prompt,
                    q1solution: category.q1.solution,
                    q1fake: category.q1.fake, 
                    q1deepfake: category.q1.deepfake,
                    q1source: category.q1.source
                })

                setInitQ2({
                    q2prompt: category.q2.prompt,
                    q2solution: category.q2.solution,
                    q2fake: category.q2.fake, 
                    q2deepfake: category.q2.deepfake,
                    q2source: category.q2.source
                })

                setInitQ3({
                    q3prompt: category.q3.prompt,
                    q3solution: category.q3.solution,
                    q3fake: category.q3.fake, 
                    q3deepfake: category.q3.deepfake,
                    q3source: category.q3.source
                })

                setAuthor(category.author)
                setGameId(category._id)

            } catch (err) {
                console.log(err, 'failed to submit game...')
            }
        }
        getQuestions()
    }, [])

    return (
        <AddGame 
            author={author}
            gameId={gameId}
            initQ0={initQ0}
            initQ1={initQ1}
            initQ2={initQ2}
            initQ3={initQ3}
            setInitQ0={setInitQ0}
            setInitQ1={setInitQ1}
            setInitQ2={setInitQ2}
            setInitQ3={setInitQ3}
            review={true}
            doneReviewing={doneReviewing}
        />
    )
}

export default ReviewQuestions;