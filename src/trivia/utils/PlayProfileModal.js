

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './InfoModal.css'
import CategoryInfo from '../components/CategoryInfo'

const InfoModalOverlay = props => {
    const content = (
        <div className="info-modal-backdrop">
            <div className="info-modal-container">
                <CategoryInfo 
                    category={props.category}
                    setShowInfo={props.setShowInfo}
                  
                />
            </div>
        </div>
        
    )

    return ReactDOM.createPortal(content, document.querySelector('#info'));
}

const InfoModal = props => {
    return (
        <CSSTransition
            in={props.showInfo}
            timeout={300}
            unmountOnExit
            classNames="info-modal"
        >
            <InfoModalOverlay {...props}/>
        </CSSTransition>
    )
}

export default InfoModal;