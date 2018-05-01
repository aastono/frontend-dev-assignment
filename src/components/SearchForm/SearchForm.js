import React, {Component} from "react";
import axios from "axios";
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            suggestions: []
        };
    }

    render() {
        return (
            <div>
                <form className="search-form">
                    <input
                        className="search-text-field"
                        placeholder="Zoeken"
                        onChange={this.handleInputChange}
                        ref={input => this.search = input}
                    />
                    {this.state.query.length > 0
                        ?   <button
                                className="clear-button"
                                onClick={this.handleClearButtonClick}
                            >
                                x
                            </button>
                        : null
                    }

                    <button className="search-button">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="grey"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4-4" />
                        </svg>
                    </button>
                    <SearchSuggestions suggestions={this.state.suggestions} />
                </form>
            </div>
        );
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo();
                }
            }
        })
    };

    handleClearButtonClick = () => {
        this.search.value = "";
    };

    getInfo = () => {
        axios.get(`http://localhost:3000/search\?q\=${this.state.query}`)
            .then(({ data }) => {
                this.setState({
                    suggestions: data.suggestions
                })
            })
    };
}