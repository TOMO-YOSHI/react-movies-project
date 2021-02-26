import React from 'react';
import './App.css';

import SearchArea from './components/SearchArea';
import TabPanel from './components/TabPanel';

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

  messageWhileTyping = () => {
    this.setState(prev => ({
      ...prev,
      searchResultMessage: "Please initiate a search",
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
        <TabPanel
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
    padding: .5rem;
`

export default App;
