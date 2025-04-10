import React from "react";

const TasksFilter = ({ setFilter }) => {
    return (
        <div className="tasks-filter">
            <button onClick={() => setFilter("day")}>Jour</button>
            <button onClick={() => setFilter("week")}>Semaine</button>
            <button onClick={() => setFilter("month")}>Mois</button>
            <button onClick={() => setFilter("completed")}>Complétées</button> {/* ✅ Nouveau bouton */}
        </div>
    );
};

export default TasksFilter;
