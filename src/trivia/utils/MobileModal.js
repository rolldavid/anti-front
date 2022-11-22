
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './MobileModal.css'

const MobileModalOverlay = props => {
    const currentItems = props.nav.props.children; 
    const renderNav = currentItems.map((navitem, index) => {
        return (

            <div className="mobile-items" key={index} onClick={() => {props.setShowMobile(false)}}>
                {navitem}
            </div>
        )
    })

    const content = (
        <div className="mobile-modal-backdrop" onClick={() => {props.setShowMobile(false)}}>
            <div className="mobile-modal-container" >
                <div className="mobile-close">x</div>
                <div className="navlinks-mobile">
                {renderNav}
                </div>
            </div>
        </div>
    )

    return ReactDOM.createPortal(content, document.querySelector('#mobilemenu'));
}

const MobileModal = props => {

    return (
        <CSSTransition
            in={props.showMobile}
            timeout={300}
            unmountOnExit
            classNames="mobile-modal"
        >
            <MobileModalOverlay {...props}/>
        </CSSTransition>
    )
}

export default MobileModal;