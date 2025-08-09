import React from 'react';
import PropTypes from 'prop-types';
import './FilterButton.css';

const FilterButton = ({ filter, setFilter }) => {
    const filters = ["All", "Completed", "Incomplete"];
    return (
        <div className="filter-container">
            {filters.map((f) => (
                <button
                    key={f}
                    className={`filter-btn ${filter === f ? "active" : ""}`}
                    onClick={() => setFilter(f)}
                >
                    {f}
                </button>
            ))}
        </div>
    );
}

FilterButton.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
};

export default FilterButton;
