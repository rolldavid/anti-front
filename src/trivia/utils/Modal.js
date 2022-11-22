import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.css';
import TrivQuestion from '../components/TrivQuestion';

const QuestionModalOverlay = props => {
    const content = (
        <div className="modal-backdrop">
            <div className="modal-container">
                <TrivQuestion 
                    amount={props.amount}
                    category={props.category}
                    catNum={props.catNum}
                    questionNumber={props.questionNumber}
                    setShowModal={props.setShowModal}
                    setQ={props.setQ}
                    practice={props.practice}
                    bookmarkedGame={props.bookmarkedGame}

                />
            </div>
        </div>
    )

    return ReactDOM.createPortal(content, document.querySelector('#question'));
}

const QuestionModal = props => {

    return (
        <CSSTransition
            in={props.showModal}
            timeout={300}
            unmountOnExit
            classNames="modal"
        >
            <QuestionModalOverlay {...props}/>
        </CSSTransition>
    )
}

export default QuestionModal;