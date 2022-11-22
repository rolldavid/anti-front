
import { useState, useEffect } from 'react';
import bookmark from '../../img/bookmark.png'
import bookmarked from '../../img/bookmarked.png'
import { useHTTP } from '../../shared/hooks/http-hook';

import './AddBookmarksButton.css';

const AddBookmarksButton = ({ id, question }) => {
    const { isLoading, error, sendRequest, clearError } = useHTTP();
    const storedData = JSON.parse(localStorage.getItem('userData'));

    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const checkBookmarks = async () => {
            if (storedData) {
                try {
                    const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/checkbookmark`,
                    'POST',
                    JSON.stringify({
                        gameId: id,
                        question,
                        uid: storedData.userId
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                    );
                    if (responseData.isBookmarked === true) {
                        setIsAdded(true);
                    }

                } catch (err) {
                    console.log(err, 'failed to do the http thing...')
                }
            }
        }
        checkBookmarks();
        
    }, [])


    const updateBookmarks = async () => {
        if (!isAdded) {
            setIsAdded(true);
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/addbookmark`,
                'POST',
                JSON.stringify({
                    gameId: id,
                    question,
                    uid: storedData.userId
                }),
                {
                    'Content-Type': 'application/json'
                }
                );

            } catch (err) {
                setIsAdded(false);
                console.log(err, 'failed to do the http thing...')
            }
            
        } else {
            setIsAdded(false);
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/removebookmark`,
                'POST',
                JSON.stringify({
                    gameId: id,
                    question,
                    uid: storedData.userId
                }),
                {
                    'Content-Type': 'application/json'
                }
                );

            } catch (err) {
                setIsAdded(true);
                console.log(err, 'failed to do the http thing...')
            }
            setIsAdded(false);
        }
    }   

    const randomKey = Math.floor(Math.random() * 20000);
    
    return (
            <>
                {!isAdded && <img 
                    src={bookmark}
                    className="bookmark-button"
                    onClick={updateBookmarks}
                    alt={randomKey}
                />}
                {isAdded && <img 
                    src={bookmarked}
                    className="bookmark-button"
                    onClick={updateBookmarks}
                    alt={randomKey}
                />}
            </>
    )
}

export default AddBookmarksButton;