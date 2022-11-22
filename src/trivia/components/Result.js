import { useState, useEffect, useRef } from 'react';
import './Result.css';

const Result = ({ result }) => {
    
    const [resultText, setResultText] = useState('')
    useEffect(() => {
        if (result) {
            setResultText('Three strikes and you\'re out!')
        } else {
            setResultText('You win!')
        }
    }, [])
    return (
        <div className="result-container">
            {resultText}
        </div>
    )
}

export default Result;