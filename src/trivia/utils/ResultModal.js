import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Result from '../components/Result';
import './ResultModal.css';

const ResultModalOverlay = props => {
    
    const content = (
        <div className="result-modal-backdrop">
            <div className="result-modal-container">
                <Result 
                    points={props.points}
                    setShowResultModal={props.setShowResultModal}
                    practice={props.practice}
                    result={props.result}
                />
            </div>
        </div>
    )

return ReactDOM.createPortal(content, document.querySelector('#result'));
}

const ResultModal = props => {

    return (
        <CSSTransition
            in={props.showResultModal}
            timeout={300}
            unmountOnExit
            classNames="result-modal"
        >
            <ResultModalOverlay {...props}/>
        </CSSTransition>
    )
}

export default ResultModal;