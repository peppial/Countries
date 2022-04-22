import React from 'react'
import { useState, useCallback } from "react";
import { getCountriesContaining } from "../services/country-service";
import Details from "./details";

function DropDown() {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [filteredSuggestionsData, setFilteredSuggestionsData] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");
    const [details, setDetails] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState(0);


    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 1000);
        };
    };

    const changeHandler = async (e) => {
        const userInput = e.target.value;
        const data = await getCountriesContaining(userInput);
        const unLinked = data.data.map(val => val.name).slice(0, 10);

        setFilteredSuggestions(unLinked);
        setFilteredSuggestionsData(data.data);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const processChange = ((e) => {
        setInput(e.target.value);
        optimizedFn(e);
    });

    const optimizedFn = useCallback(debounce(changeHandler), []);

    const onClick = (e) => {
        setCurrentRow(filteredSuggestionsData.find(o => o.name === e.target.innerText));
        console.log(currentRow);
        setDetails(true);
        setTimeout(() => setDetails(false), 1000);
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setInput(filteredSuggestions[activeSuggestionIndex]);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        }
        else if (e.keyCode === 38) {
            if (activeSuggestionIndex === 0) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
        else if (e.keyCode === 40) {
            if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;

                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    }

                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="no-suggestions">
                <span role="img" aria-label="tear emoji">
                    😪
                </span>{" "}
                <em>sorry no suggestions</em>
            </div>
        );
    };

    return (
        <>
            <Details row={currentRow} show={details} />

            <input
                className="autocomplete"
                type="text"
                onChange={processChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            {showSuggestions && input && <SuggestionsListComponent />}
        </>
    );
};

export default DropDown;
