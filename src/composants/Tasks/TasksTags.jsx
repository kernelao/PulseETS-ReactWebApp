import React, { useState } from "react";

const TasksTags = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (newTag.trim()) {
            setTags([...tags, newTag]);
            setNewTag("");
        }
    };

    const updateTag = (index) => {
        const newLabel = prompt("Modifier le tag :", tags[index]);
        if (newLabel) {
            const updated = [...tags];
            updated[index] = newLabel;
            setTags(updated);
        }
    };

    const deleteTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="tasks-tags">
            <h3>Tags</h3>
            <div className="tag-input-container">
                <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Ajouter un tag..."
                />
                <button onClick={addTag}>+ Ajouter</button>
            </div>
            <div className="tags-list">
                {tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                        <span>{tag}</span>
                        <div className="tag-buttons">
                            <button onClick={() => updateTag(index)}>Modifier</button>
                            <button onClick={() => deleteTag(index)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TasksTags;
