import React, { useState, useEffect } from "react";
import { getData, setData } from "../utils/storage";

const AddChallenge = () => {
    const [newChallenge, setNewChallenge] = useState("");
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const saved = getData("challenges") || [];
        setChallenges(saved);
    }, []);

    const handleChange = (e) => {
        setNewChallenge(e.target.value);
    };

    const handleAdd = () => {
        if(!newChallenge) return;

        const updated = [...challenges, newChallenge.trim()];
        setChallenges(updated);
        setData("challenges", updated);
        setNewChallenge("");
    };

    const handleDelete = (index) => {
        const updated = challenges.filter((_, i) => i !== index);
        setChallenges(updated);
        setData("challenges", updated);
    };

    return (
        <div className="add-challenge">
            <h2>Add a New Challenge</h2>
            <input
                type="text"
                value={newChallenge}
                onChange={handleChange}
                placeholder="Enter a new challenge"
            />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {challenges.map((challenge, index) => (
                    <li key={index}>
                        {challenge}
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddChallenge;