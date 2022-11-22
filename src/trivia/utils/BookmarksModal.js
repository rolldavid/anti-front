import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './BookmarksModal.css';
import AddBookmarks from '../components/AddBookmarks';


const BookmarksModalOverlay = props => {
    const content = (
        <div className="bookmarks-modal-backdrop">
            <div className="bookmarks-modal-container">
                <AddBookmarks
                    setShowBookmarksModal={props.setShowBookmarksModal}
                    practice={props.practice}
                />
            </div>
        </div>
    )

    return ReactDOM.createPortal(content, document.querySelector('#question'));
}

const BookmarksModal = props => {

    return (
        <CSSTransition
            in={props.showBookmarksModal}
            timeout={300}
            unmountOnExit
            classNames="bookmarks-modal"
        >
            <BookmarksModalOverlay {...props}/>
        </CSSTransition>
    )
}

export default BookmarksModal;