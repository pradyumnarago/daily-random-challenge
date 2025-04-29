import React, { useEffect, useState } from 'react';
import { getData } from '../utils/storage';
import { getToday } from '../utils/challengeUtils';

const ChallengeHistory = () => {
    const [history, setHistory] = useState({});
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const saved = getData("dailyChallenge") || {};
        setHistory(saved);
        setStreak(calculateStreak(saved));
    }, []);

    const calculateStreak = (data) => {
        const dates = Object.keys(data).sort((a, b) => new Date(b) - new Date(a));
        let count = 0;
        let today = new Date(getToday());

        for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i]);
        if (
            date.toDateString() === today.toDateString() &&
            data[dates[i]].completed
        ) {
            count++;
            today.setDate(today.getDate() - 1);
        } else if (
            date.toDateString() === today.toDateString() &&
            !data[dates[i]].completed
        ) {
            break;
        } else if (date < today) {
            break;
        }
        }

        return count;
    };

    return (
        <div style={{ marginTop: "30px" }}>
        <h3>📆 Challenge History</h3>
        <p>🔥 Current Streak: {streak} day{streak !== 1 ? "s" : ""}</p>
        <ul>
            {Object.entries(history)
            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
            .map(([date, data], index) => (
                <li key={index}>
                <strong>{date}</strong>: {data.text} —{" "}
                {data.completed ? " Completed" : "Not done"}
                </li>
            ))}
        </ul>
        </div>
    );
};

export default ChallengeHistory;
