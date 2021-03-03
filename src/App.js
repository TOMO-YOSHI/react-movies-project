import React from 'react';
import './App.css';

// components
import SearchSection from './components/SearchSection';
import TabsSection from './components/TabsSection';

import styled from "styled-components";

const api_key = process.env.REACT_APP_MOVIES_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchType: "",
      searchResultMessage: "Please enter a search"
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchResults !== this.state.searchResults &&
        this.state.searchResults.length === 0) {
            this.setState(prev => ({
                ...prev,
                searchResultMessage: "Sorry, there were no results",
            }))
    }
}

  getSearchResultsHandler = (searchType, data) => {
    this.setState(prev=>({
      ...prev,
      searchType: searchType,
      searchResults: data
    }));
  }

  messageWhileTyping = (searchInput) => {
    const message = searchInput ? "Please initiate a search" : "Please enter a search";
    this.setState(prev => ({
      ...prev,
      searchResultMessage: message,
    }))
  }

  searchHandler = async(e, searchType, searchInput) => {
    e.preventDefault();

    this.setState(prev => ({
      ...prev,
      searchResults: [],
    }))

    if(searchInput !== "") {
        const searchResults = await fetch(`https://api.themoviedb.org/3/search/${searchType}?api_key=${api_key}&language=en-US&query=${searchInput}&page=1&include_adult=false`)
        .then(response => response.json())
        .catch(error => console.log(error));

        this.getSearchResultsHandler(searchType, searchResults.results);

        this.setState(prev=>({
            ...prev,
            searchResults: searchResults.results
        }));
    }
  }

  render() {
    return (
      <div className="App">
        <AppHeader1>React Movies App</AppHeader1>
        <SearchSection 
          messageWhileTyping={this.messageWhileTyping}
          searchHandler={this.searchHandler}
          searchType={this.state.searchType}
          />
        <TabsSection
          searchType={this.state.searchType}
          searchResults={this.state.searchResults}
          searchResultMessage={this.state.searchResultMessage}
          />
      </div>
    );
    }
}

const AppHeader1 = styled.h1`
    border: 3px solid #000000;
    padding: 1rem;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
    font-size: 2.5rem;
`

export default App;
