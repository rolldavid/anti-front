
import { useState, useEffect } from 'react';

import AddGame from './AddGame';
import './ContributeQuestions.css';

const ContributeQuestions = () => {


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

    return (
        <AddGame 
            initQ0={initQ0}
            initQ1={initQ1}
            initQ2={initQ2}
            initQ3={initQ3}
            setInitQ0={setInitQ0}
            setInitQ1={setInitQ1}
            setInitQ2={setInitQ2}
            setInitQ3={setInitQ3}
            review={false}
            doneReviewing={false}
        />
    )
}

export default ContributeQuestions;