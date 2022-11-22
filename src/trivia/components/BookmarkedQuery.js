import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './BookmarkedQuery.css'
import BookmarkCard from './BookmarkCard';
import { useHTTP } from '../../shared/hooks/http-hook';
import { handleLoading } from '../../user/utils/is-loading';
import { useStyle } from '../hooks/container-style-hook';

const BookmarkedQuery = ({ isFiltered, searchTerm, filterType, setCategories, setHasBookmarks, setBookmarkedList, bookmarkedList, bookmarkedFilteredList, setBookmarkedFilteredList }) => {
    const [noResults, setNoResults] = useState(false);
    const storedData = JSON.parse(localStorage.getItem('userData'));
    
    const { uid } = useParams();

    const { isLoading, error, sendRequest, clearError } = useHTTP();

    useEffect(() => {
            if (!isFiltered) {
                setNoResults(false)
                const getCategories = async () => {
                    try {
                        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/bookmarked/${uid}`)
                        
                        setBookmarkedList(responseData.bookmarkedQuestions)
                        setCategories(responseData.categories)
                        if (responseData.bookmarkedQuestions.length < 1) {
                            setHasBookmarks(false)
                        }
                      
                        
                    } catch (err) {
                        console.log(err, 'failed to do the http thing...')
                    }
                }
                getCategories();
            }
            if (isFiltered) {
                setNoResults(false)
                const searchBookmarks = async () => {
                    try {
                        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/searchbookmark`,
                        'POST',
                        JSON.stringify({
                            uid: storedData.userId,
                            term: searchTerm,
                            type: filterType
                        }),
                        {
                            'Content-Type': 'application/json'
                        }
                        );
                        if (responseData.bookmarkedQuestions.length < 1) {
                            setNoResults(true)
                            setBookmarkedFilteredList(bookmarkedList)
                
                        } else {
                            setBookmarkedFilteredList(responseData.bookmarkedQuestions)
                        }
        
                    } catch (err) {
                        console.log(err, 'failed to do the http thing...')
                    }
                }
                searchBookmarks();
            }

    }, [searchTerm])

    return (
        
        <div className="bookmarked-query-container">
                {isLoading && <div className="trivia-retrieve-container">{handleLoading()}</div>}
                {!isLoading && noResults && <div className="bookmarked-detail-container">
                    <p className="no-results">No results found. Try another search.</p>
                </div>}
                
                {!isLoading && !isFiltered && <div className="bookmarked-detail-container">
                    {
                    bookmarkedList.map((list, index) =>  
                        
                            <BookmarkCard
                                question={list.question.prompt}
                                answer={list.question.solution}
                                id={list.gameNum}
                                questionNum={list.questionNum}
                                key={index}
                                addBookmark={false}
                            />
                    )}
                    
                    </div>}
                    {!isLoading && isFiltered && <div className="bookmarked-detail-container">
                    {
                    bookmarkedFilteredList.map((list, index) =>  
                        
                            <BookmarkCard
                                question={list.question.prompt}
                                answer={list.question.solution}
                                id={list.gameNum}
                                questionNum={list.questionNum}
                                key={index}
                                addBookmark={false}
                            />
                    )}
                    
                    </div>}
                   
        </div>
    )
}

export default BookmarkedQuery;