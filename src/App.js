import React from 'react';
import './App.css';

import SearchArea from './components/SearchArea';
import SimpleTabs from './components/SimpleTabs';

import styled from "styled-components";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchInput: "",
      searchType: "multi",
      searchResults: [],
      searchResultMessage: "Please enter a search"
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.searchInput);
    // console.log(this.state.searchType);
    // console.log(this.state.searchResults);
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

  render() {
    return (
      <div className="App">
        <AppHeader1>React Movies App</AppHeader1>
        <SearchArea 
          getSearchResultsHandler={this.getSearchResultsHandler}
          messageWhileTyping={this.messageWhileTyping}
          />
        <SimpleTabs
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
