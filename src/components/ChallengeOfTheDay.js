import React, { useEffect, useState } from 'react';
import { getToday,getRandomChallenge } from '../utils/challengeUtils';
import { getData, setData } from '../utils/storage';

const ChallengeOfTheDay = () => {
    const today = getToday();
    const [challenge, setChallenge] = useState(null);
    const [completed, setCompleted] = useState(false);

    const defaultChallenges = [
        'Do 10 push-ups',
        'read 10 pages of a book',
        'stretch for 10 minutes',
        'Run 500m',
        'Write down 3 gratitudes'
    ];

    useEffect(() => {
        const saved = getData('dailyChallenge') || {};
        const allChallenges = getData('challenges') || defaultChallenges;

        if(saved[today]){
            setChallenge(saved[today].text);
            setCompleted(saved[today].completed);
        } else {
            const newChallenge = getRandomChallenge(allChallenges);
            saved[today] = {text: newChallenge, completed: false};
            setData('dailyChallenge', saved);
            setChallenge(newChallenge);
        }
    },[]);

    const markDone = () => {
        const saved = getData('dailyChallenge') || {};
        saved[today].completed = true;
        setData('dailyChallenge',saved);
        setCompleted(true);
    };

    

    return(
        <div className='challenge-of-the-day'>
            <h2>Today's Challenge</h2>
            <p>{challenge}</p>
            <button onClick={markDone} disabled={completed} className='completed-button'>
                {completed ? 'Completed' : 'Mark as Done'}
            </button>
        </div>
    );
};

export default ChallengeOfTheDay;