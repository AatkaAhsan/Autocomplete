import React, { useState } from 'react';
import './Autocomplete.css'; // CSS styles for Autocomplete component

const data = [
  'apple',
  'banana',
  'cherry',
  'grape',
  'kiwi',
  'lemon',
  'orange',
  'pear',
  'strawberry',
  'watermelon',
];

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(filtered.slice(0, 5));
    } else {
      setFilteredResults([]);
    }

    setSelectedItem(null); // Clear the selected item when input value changes
  };

  const handleClearInput = () => {
    setInputValue('');
    setFilteredResults([]);
    setShowAllResults(false);
    setSelectedItem(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAllResults(true);
  };

  const handleItemClick = (item) => {
    setInputValue(item);
    setFilteredResults([]);
    setSelectedItem(item);
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => (
      part.toLowerCase() === highlight.toLowerCase() ?
        <span key={index} className="highlight">{part}</span> :
        part
    ));
  };

  return (
    <div className="autocomplete">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search..."
          />
          {inputValue && (
            <button type="button" className="clear-button" onClick={handleClearInput}>
              Clear
            </button>
          )}
        </div>
        {filteredResults.length > 0 && !showAllResults && (
          <ul className="results-list">
            {filteredResults.map((item) => (
              <li
                key={item}
                onClick={() => handleItemClick(item)}
                className={selectedItem === item ? "selected" : ""}
              >
                {getHighlightedText(item, inputValue)}
              </li>
            ))}
          </ul>
        )}
        {showAllResults && (
          <ul className="results-list">
            {data.map((item) => (
              <li key={item}>
                {getHighlightedText(item, inputValue)}
              </li>
            ))}
          </ul>
        )}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Autocomplete;
