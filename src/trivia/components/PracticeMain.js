

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Strikes from './Strikes';
import CategoryContainer from './CategoryContainer';
import { updatePracticeStrikes, resetPracticeStrikes, resetPracticeQuestionCount, setPracticePlayed } from '../actions';
import GameOver from './GameOver';
import './PracticeMain.css';
import ResultModal from '../utils/ResultModal';
import LoginForm from '../../user/components/auth/LoginForm';

const PracticeMain = ({ userStatus, strikes, guessStreak, updatePracticeStrikes, resetPracticeStrikes, practiceQuestionsAnswered, resetPracticeQuestionCount, setPracticePlayed, practicePlayed }) => {
   
    const [showResultModal, setShowResultModal] = useState(false);
   
    useEffect(() => {
        resetPracticeQuestionCount();
        resetPracticeStrikes();
    }, [])

    useEffect(() => {
        if (guessStreak === 3 && strikes > 0) {
            updatePracticeStrikes(-1)
        }
    }, [guessStreak])

    useEffect(() => {
        if (strikes === 3 && !practicePlayed) {
            
                setShowResultModal(true)
                setPracticePlayed(true)
                setTimeout(() => {
                    setShowResultModal(false)
                }, 2000)
            }
    }, [strikes])

    useEffect(() => {
        if (practiceQuestionsAnswered >= 9 && !practicePlayed) {
            setShowResultModal(true)
            setPracticePlayed(true)
            
            setTimeout(() => {
                setShowResultModal(false)
            }, 2000)
        }
    }, [practiceQuestionsAnswered])

    return (
        <>
        <div className="archive-header">
                Archive
        </div>  
        <div className="practice-main-container">
            
            {userStatus && !practicePlayed && <div className="strikes-container">
                <Strikes practice/>
            </div>}
            
            {userStatus && !practicePlayed && <div className="triv-container">
                <CategoryContainer 
                    practice={true} 
                    bookmarkedGame={false}
                />
            </div>}

            {userStatus && practicePlayed && <div>
                <GameOver 
                    practice={true}
                />
            </div>}

            {!userStatus && 
                    <div className="bookmarks-inner-container">
                        <LoginForm />
                    </div>
            }

            <ResultModal 
                        setShowResultModal={setShowResultModal}
                        showResultModal={showResultModal}
                        practice={true}  
                        result={strikes >= 3 ? true : false}
            />
        </div>
    </>
    )
}

const mapStateToProps = state => {
    return {
        strikes: state.userStrikes.practiceStrikes,
        guessStreak: state.guessStreak.practiceStreak,
        practiceQuestionsAnswered: state.practiceQuestionsAnswered.count,
        practicePlayed: state.practicePlayed.played,
        userStatus: state.userStatus.userStatus
    }
}

export default connect(mapStateToProps, { updatePracticeStrikes, resetPracticeStrikes, resetPracticeQuestionCount, setPracticePlayed })(PracticeMain);