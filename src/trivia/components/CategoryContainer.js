import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';
import { useHTTP } from '../../shared/hooks/http-hook';
import TrivCategory from './TrivCategory';
import './CategoryContainer.css';
import { handleLoading } from '../../user/utils/is-loading';
import { setDailyGameFetched } from '../actions';
import { setArchiveId } from '../actions';
import GameOver from './GameOver'


const CategoryContainer = ({ practice, bookmarkedGame, gameIsFetched, setDailyGameFetched, setArchiveId, strikes, gameStatus, newGame, setNewGame, setGameLoading, userId, bookmarkedGameCat1, bookmarkedGameCat2, bookmarkedGameCat3 }) => {
    
    const gameComplete = JSON.parse(localStorage.getItem('gameComplete'));
  
    const storedGame1 = JSON.parse(localStorage.getItem('game1'));
    const storedGame2 = JSON.parse(localStorage.getItem('game2'));
    const storedGame3 = JSON.parse(localStorage.getItem('game3'));

    const [cat1, setCat1] = useState('');
    const [cat2, setCat2] = useState('');
    const [cat3, setCat3] = useState('');

    const [cat1Q1, setCat1Q1] = useState("category-select-container-default")
    const [cat1Q2, setCat1Q2] = useState("category-select-container-default")
    const [cat1Q3, setCat1Q3] = useState("category-select-container-default")

    const [cat2Q1, setCat2Q1] = useState("category-select-container-default")
    const [cat2Q2, setCat2Q2] = useState("category-select-container-default")
    const [cat2Q3, setCat2Q3] = useState("category-select-container-default")

    const [cat3Q1, setCat3Q1] = useState("category-select-container-default")
    const [cat3Q2, setCat3Q2] = useState("category-select-container-default")
    const [cat3Q3, setCat3Q3] = useState("category-select-container-default")

    const [showInfo1, setShowInfo1] = useState(false)
    const [showInfo2, setShowInfo2] = useState(false)
    const [showInfo3, setShowInfo3] = useState(false)

    const { isLoading, error, sendRequest, clearError } = useHTTP();

    useEffect(() => {
        if (!gameIsFetched && !practice && !bookmarkedGame) {
            const getCategories = async () => {
                try {
                    const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/secretgame`)
                    const bytes  = CryptoJS.AES.decrypt(responseData.cat1, 'antitriv');
                    const decryptedData1 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));  
                    const bytes2  = CryptoJS.AES.decrypt(responseData.cat2, 'antitriv');
                    const decryptedData2 = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));  
                    const bytes3  = CryptoJS.AES.decrypt(responseData.cat3, 'antitriv');
                    const decryptedData3 = JSON.parse(bytes3.toString(CryptoJS.enc.Utf8));  
                    
                    setCat1(decryptedData1);
                    setCat2(decryptedData2);
                    setCat3(decryptedData3);

                    if (!storedGame1) {
                        localStorage.setItem(
                            'game1',
                            JSON.stringify({ 
                               
                                    id: decryptedData1.id,
                                    q1: 'unplayed',
                                    q2: 'unplayed',
                                    q3: 'unplayed'
                             })
                            ) 
                        localStorage.setItem(
                            'strikes', 
                            JSON.stringify({ 
                                    strikes: 0  
                                })
                            ) 
                        localStorage.setItem(
                            'score', 
                            JSON.stringify({ 
                                    score: 0  
                                })
                            ) 
                        localStorage.setItem(
                            'gameComplete', 
                            JSON.stringify({ 
                                    questionsAnswered: 0,
                                    complete: false,
                                    scoreAdded: false
                                })
                            ) 
                            
                    } else if (decryptedData1.id !== storedGame1.id) {
                        localStorage.setItem(
                            'game1',
                            JSON.stringify({ 
                                
                                    id: decryptedData1.id,
                                    q1: 'unplayed',
                                    q2: 'unplayed',
                                    q3: 'unplayed'
                                
                             })
                            ) 

                        localStorage.setItem(
                            'strikes', 
                            JSON.stringify({ 
                                    strikes: 0  
                             })
                            ) 

                        localStorage.setItem(
                            'score', 
                            JSON.stringify({ 
                                    score: 0  
                                })
                            ) 

                        localStorage.setItem(
                            'gameComplete', 
                            JSON.stringify({ 
                                    questionsAnswered: 0,
                                    complete: false,
                                    scoreAdded: false
                                })
                            ) 
                    }

                    if (!storedGame2) {
                        localStorage.setItem(
                            'game2',
                            JSON.stringify({ 
                                
                                    id: decryptedData2.id,
                                    q1: 'unplayed',
                                    q2: 'unplayed',
                                    q3: 'unplayed'
                                
                             })
                            ) 
                    } else if (decryptedData2.id !== storedGame2.id) {
                        localStorage.setItem(
                            'game2',
                            JSON.stringify({ 
                                
                                    id: decryptedData2.id,
                                    q1: 'unplayed',
                                    q2: 'unplayed',
                                    q3: 'unplayed'
                                
                             })
                            ) 
                    } 


                    if (!storedGame3) {
                        localStorage.setItem(
                            'game3',
                            JSON.stringify({ 
                                
                                    id: decryptedData3.id,
                                    q1: 'unplayed',
                                    q2: 'unplayed',
                                    q3: 'unplayed'
                                
                             })
                            ) 
                    } else if (decryptedData3.id !== storedGame3.id) {
                        localStorage.setItem(
                            'game3',
                            JSON.stringify({ 
                                
                                    id: decryptedData3.id,
                                    q1: 'unplayed',
                                    q2: 'unplayed',
                                    q3: 'unplayed'
                                
                             })
                            ) 
                            window.location.reload(false);
                    } 

                    setGameLoading(false)
                    
                    //setDailyGameFetched(true) 
                } catch (err) {
                    console.log(err, 'failed to do the http thing...')
                }

                
            }

            getCategories();
            
            
        } /* else if (gameIsFetched && !practice) {
            const getCategories = async () => {
                try {
                    const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/secretgame`)
                    const bytes  = CryptoJS.AES.decrypt(responseData.cat1, 'antitriv');
                    const decryptedData1 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));  
                    const bytes2  = CryptoJS.AES.decrypt(responseData.cat2, 'antitriv');
                    const decryptedData2 = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));  
                    const bytes3  = CryptoJS.AES.decrypt(responseData.cat3, 'antitriv');
                    const decryptedData3 = JSON.parse(bytes3.toString(CryptoJS.enc.Utf8));  
                    
                    setCat1(decryptedData1);
                    setCat2(decryptedData2);
                    setCat3(decryptedData3);
                
                } catch (err) {
                    console.log(err, 'failed to do the http thing...')
                }
            }
            getCategories();

        } */ else if (practice && !bookmarkedGame) {
            const getCategories = async () => {
                try {
                    const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/practice`)
                    
                    const bytes  = CryptoJS.AES.decrypt(responseData.cat1, 'antitriv');
                    const decryptedData1 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));  
                    const bytes2  = CryptoJS.AES.decrypt(responseData.cat2, 'antitriv');
                    const decryptedData2 = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));  
                    const bytes3  = CryptoJS.AES.decrypt(responseData.cat3, 'antitriv');
                    const decryptedData3 = JSON.parse(bytes3.toString(CryptoJS.enc.Utf8));  

                    setCat1(decryptedData1);
                    setCat2(decryptedData2);
                    setCat3(decryptedData3);
                
                    setArchiveId(decryptedData1.id, 1, [decryptedData1.q1.prompt, decryptedData1.q2.prompt, decryptedData1.q3.prompt])
                    setArchiveId(decryptedData2.id, 2, [decryptedData2.q1.prompt, decryptedData2.q2.prompt, decryptedData2.q3.prompt])
                    setArchiveId(decryptedData3.id, 3, [decryptedData3.q1.prompt, decryptedData3.q2.prompt, decryptedData3.q3.prompt])
                
                } catch (err) {
                    console.log(err, 'failed to do the http thing...')
                }
            }
            getCategories();

        } else if (bookmarkedGame) {
            setCat1(bookmarkedGameCat1);
            setCat2(bookmarkedGameCat2);
            setCat3(bookmarkedGameCat3);
        }

    }, [])


    useEffect(() => {
       
        if (storedGame1 && !practice && !bookmarkedGame) {
            if (storedGame1.q1 === 'won') {
                setCat1Q1("category-select-winner")
            } else if (storedGame1.q1 === 'lost') {
                setCat1Q1("category-select-loser")
            } else if (storedGame1.q1 === 'unplayed') {
                setCat1Q1("category-select-container-default")
              
            }

            if (storedGame1.q2 === 'won') {
                setCat1Q1("category-select-winner")
            } else if (storedGame1.q2 === 'lost') {
                setCat1Q2("category-select-loser")
            } else if (storedGame1.q2 === 'unplayed') {
                setCat1Q2("category-select-container-default")
              
            }

            if (storedGame1.q3 === 'won') {
                setCat1Q3("category-select-winner")
            } else if (storedGame1.q3 === 'lost') {
                setCat1Q3("category-select-loser")
            } else if (storedGame1.q3 === 'unplayed') {
                setCat1Q3("category-select-container-default")
              
            }
        }

        if (storedGame2 && !practice && !bookmarkedGame) {
            if (storedGame2.q1 === 'won') {
                setCat2Q1("category-select-winner")
            } else if (storedGame2.q1 === 'lost') {
                setCat2Q1("category-select-loser")
            } else if (storedGame2.q1 === 'unplayed') {
                setCat2Q1("category-select-container-default")
            
            }

            if (storedGame2.q2 === 'won') {
                setCat2Q1("category-select-winner")
            } else if (storedGame2.q2 === 'lost') {
                setCat2Q2("category-select-loser")
            } else if (storedGame2.q2 === 'unplayed') {
                setCat2Q2("category-select-container-default")
             
            }

            if (storedGame2.q3 === 'won') {
                setCat2Q3("category-select-winner")
            } else if (storedGame2.q3 === 'lost') {
                setCat2Q3("category-select-loser")
            } else if (storedGame2.q3 === 'unplayed') {
                setCat2Q3("category-select-container-default")
               
            }
        }

        if (storedGame3 && !practice && !bookmarkedGame) {
            if (storedGame3.q1 === 'won') {
                setCat3Q1("category-select-winner")
            } else if (storedGame3.q1 === 'lost') {
                setCat3Q1("category-select-loser")
            } else if (storedGame3.q1 === 'unplayed') {
                setCat3Q1("category-select-container-default")
            
            }

            if (storedGame3.q2 === 'won') {
                setCat3Q2("category-select-winner")
            } else if (storedGame3.q2 === 'lost') {
                setCat3Q2("category-select-loser")
            } else if (storedGame3.q2 === 'unplayed') {
                setCat3Q2("category-select-container-default")
           
            }

            if (storedGame3.q3 === 'won') {
                setCat3Q3("category-select-winner")
            } else if (storedGame3.q3 === 'lost') {
                setCat3Q3("category-select-loser")
            } else if (storedGame3.q3 === 'unplayed') {
                setCat3Q3("category-select-container-default")
               
            }
        }
        
    }, [])


    return (
        <>
            {!gameStatus && !practice && !bookmarkedGame && <div className="triv-main-container" >
                {isLoading && <div className="trivia-retrieve-container">{handleLoading()}</div>}
                {!isLoading && <div className="category-container">
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat1}
                            catNum="1"
                            setQ1={setCat1Q1}
                            setQ2={setCat1Q2}
                            setQ3={setCat1Q3}
                            q1Style={cat1Q1}
                            q2Style={cat1Q2}
                            q3Style={cat1Q3}
                            setShowInfo={setShowInfo1}
                            setShowInfo2={setShowInfo2}
                            setShowInfo3={setShowInfo3}
                            showInfo={showInfo1}
                            practice={false}
                            bookmarkedGame={false}
                        />
                        
                    </div>
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat2}
                            catNum="2"
                            setQ1={setCat2Q1}
                            setQ2={setCat2Q2}
                            setQ3={setCat2Q3}
                            q1Style={cat2Q1}
                            q2Style={cat2Q2}
                            q3Style={cat2Q3}
                            setShowInfo={setShowInfo2}
                            setShowInfo2={setShowInfo1}
                            setShowInfo3={setShowInfo3}
                            showInfo={showInfo2}
                            practice={false}
                            bookmarkedGame={false}
                        />
                    </div>
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat3}
                            catNum="3"
                            setQ1={setCat3Q1}
                            setQ2={setCat3Q2}
                            setQ3={setCat3Q3}
                            q1Style={cat3Q1}
                            q2Style={cat3Q2}
                            q3Style={cat3Q3}
                            setShowInfo={setShowInfo3}
                            setShowInfo2={setShowInfo1}
                            setShowInfo3={setShowInfo2}
                            showInfo={showInfo3}
                            practice={false}
                            bookmarkedGame={false}
                        />
                    </div>
                </div>}
            </div>}


            {practice && !bookmarkedGame && <div className="triv-main-container" >
                {isLoading && <div className="trivia-retrieve-container">{handleLoading()}</div>}
                {!isLoading && <div className="category-container">
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat1}
                            catNum="1"
                            setQ1={setCat1Q1}
                            setQ2={setCat1Q2}
                            setQ3={setCat1Q3}
                            q1Style={cat1Q1}
                            q2Style={cat1Q2}
                            q3Style={cat1Q3}
                            setShowInfo={setShowInfo1}
                            setShowInfo2={setShowInfo2}
                            setShowInfo3={setShowInfo3}
                            showInfo={showInfo1}
                            practice={true}
                            bookmarkedGame={false}
                            
                        />
                        
                    </div>
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat2}
                            catNum="2"
                            setQ1={setCat2Q1}
                            setQ2={setCat2Q2}
                            setQ3={setCat2Q3}
                            q1Style={cat2Q1}
                            q2Style={cat2Q2}
                            q3Style={cat2Q3}
                            setShowInfo={setShowInfo2}
                            setShowInfo2={setShowInfo1}
                            setShowInfo3={setShowInfo3}
                            showInfo={showInfo2}
                            practice={true}
                            bookmarkedGame={false}
                            
                        />
                    </div>
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat3}
                            catNum="3"
                            setQ1={setCat3Q1}
                            setQ2={setCat3Q2}
                            setQ3={setCat3Q3}
                            q1Style={cat3Q1}
                            q2Style={cat3Q2}
                            q3Style={cat3Q3}
                            setShowInfo={setShowInfo3}
                            setShowInfo2={setShowInfo1}
                            setShowInfo3={setShowInfo2}
                            showInfo={showInfo3}
                            practice={true}
                            bookmarkedGame={false}
                        
                        />
                    </div>
                </div>}
            </div>}

            {bookmarkedGame && 
                <div className="triv-main-container" >
                {isLoading && <div className="trivia-retrieve-container">{handleLoading()}</div>}
                {!isLoading && <div className="category-container">
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat1}
                            catNum="1"
                            setQ1={setCat1Q1}
                            setQ2={setCat1Q2}
                            setQ3={setCat1Q3}
                            q1Style={cat1Q1}
                            q2Style={cat1Q2}
                            q3Style={cat1Q3}
                            setShowInfo={setShowInfo1}
                            setShowInfo2={setShowInfo2}
                            setShowInfo3={setShowInfo3}
                            showInfo={showInfo1}
                            practice={false}
                            bookmarkedGame={true}
                            
                        />
                        
                    </div>
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat2}
                            catNum="2"
                            setQ1={setCat2Q1}
                            setQ2={setCat2Q2}
                            setQ3={setCat2Q3}
                            q1Style={cat2Q1}
                            q2Style={cat2Q2}
                            q3Style={cat2Q3}
                            setShowInfo={setShowInfo2}
                            setShowInfo2={setShowInfo1}
                            setShowInfo3={setShowInfo3}
                            showInfo={showInfo2}
                            practice={false}
                            bookmarkedGame={true}
                            
                        />
                    </div>
                    <div className="category-detail">
                        <TrivCategory 
                            category={cat3}
                            catNum="3"
                            setQ1={setCat3Q1}
                            setQ2={setCat3Q2}
                            setQ3={setCat3Q3}
                            q1Style={cat3Q1}
                            q2Style={cat3Q2}
                            q3Style={cat3Q3}
                            setShowInfo={setShowInfo3}
                            setShowInfo2={setShowInfo1}
                            setShowInfo3={setShowInfo2}
                            showInfo={showInfo3}
                            practice={false}
                            bookmarkedGame={true}
                        
                        />
                    </div>
                </div>}
            </div>
            }



            {!practice && gameStatus && !bookmarkedGame && <div>
                <GameOver 
                practice={false}
                result={strikes >= 3 ? true : false}

            />
            </div>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        gameIsFetched: state.dailyGameStatus.fetched,
        strikes: state.userStrikes.strikes,
        gameStatus: state.dailyGameStatus.active
    }
}

export default connect(mapStateToProps, { setDailyGameFetched, setArchiveId })(CategoryContainer);

