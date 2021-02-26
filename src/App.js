import React from 'react';
import './App.css';

import SearchArea from './components/SearchArea';
import TabPanel from './components/TabPanel';

import styled from "styled-components";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchType: ["movie", "multi", "tv"],
    }
  }

  render() {
    return (
      <div className="App">
        <AppHeader1>React Movies App</AppHeader1>
        <SearchArea />
        <TabPanel />
      </div>
    );
    }
}

const AppHeader1 = styled.h1`
    border: 3px solid #000000;
    padding: .5rem;
`

export default App;
