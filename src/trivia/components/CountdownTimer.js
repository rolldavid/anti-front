import { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import { updateStrikes, updatePracticeStrikes } from '../actions';
import './CountdownTimer.css'
import thud from '../../sounds/thud.mp3'


const CountdownTimer = ({ timerLength, setShowModal, setQ, cancelTimer, updateStrikes, updatePracticeStrikes, practice }) => {
    const soundData = JSON.parse(localStorage.getItem('sound'));
    
    const width = Math.floor(window.innerWidth);
    const height = Math.floor(window.innerHeight);

    let wrong = new Audio(thud);


    const playWrongSound = () => {
        if (soundData) {
            if (soundData.soundStatus) {
            wrong.volume = 0.25
            wrong.play()
            }
        } else {
            wrong.volume = 0.25
            wrong.play()
        }
    }

    const timerRef = useRef(null);
    let animationInterval;
    let animationHeight;

    if (width > 768) {
        animationHeight = 500;
        animationInterval = timerLength / animationHeight;
    }
    else if (width > 480 && width <= 768) {
        animationHeight = 500;
        animationInterval = timerLength / animationHeight;
    } else {
        animationHeight = height;
        animationInterval = timerLength / animationHeight;
    }
    
    let intervalCount = 0;

    let timerAnimation;
    
    useEffect(() => {
            if (cancelTimer) {
                clearInterval(timerAnimation)
                return;
            } 

            timerAnimation = setInterval(() => {
                intervalCount++;
                if (animationHeight === intervalCount) {
                    playWrongSound()
                    if (practice) {
                        setTimeout(() => {
                            updatePracticeStrikes(1)
                        }, 100)
                    } else {
                        setTimeout(() => {
                            updateStrikes(1)
                        }, 100)
                    }
                    setQ("category-select-loser")
                }
                const updateHeight = (timerRef.current.height.baseVal.value + 1).toString();
                timerRef.current.setAttribute("height", `${updateHeight}`)
                
            }, animationInterval)
            
            return () => {
                clearInterval(timerAnimation)
            }
    }, [cancelTimer])


    return (
            <div className="timer-container">
                <svg className="svg-timer-fill">
                    <rect
                        className="timer-fill-detail"
                        ref={timerRef}
                        fill="#ffffff"
                        x="0"
                        y="0"
                        width="20"
                        height="0"
                        rx="0"
                    />
                </svg> 
            </div>
    )
}

export default connect(null, {updateStrikes, updatePracticeStrikes})(CountdownTimer);