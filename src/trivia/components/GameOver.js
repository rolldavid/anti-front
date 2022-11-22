import { useState } from 'react';
import { Link } from 'react-router-dom';


import './GameOver.css';
import BookmarksModal from '../utils/BookmarksModal';
import AddBookmarks from './AddBookmarks';

const GameOver = ({ practice }) => {
    const [showBookmarksModal, setShowBookmarksModal] = useState(false)
    
    return (
        <div className="game-over-container">
            <AddBookmarks practice={practice} /> 
        </div>
    )
}

export default GameOver;