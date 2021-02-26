import React, { Component } from 'react';
import styled from "styled-components";

// elements
import Input from '../elements/Input/Input';
import DropdownList from '../elements/DropdownList/DropdownList';
import Button from '../elements/Button/Button';

const api_key = process.env.REACT_APP_MOVIES_API_KEY;

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            searchType: "multi",
            autocompleteList: [],
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.state.searchInput);
        // console.log(this.state.searchType);
        // console.log(this.state.searchResults);
        // console.log(this.state.autocompleteList);
    }

    onChange = (e) => {
        this.setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    searchHandler = async(e) => {
        e.preventDefault();

        if(this.state.searchInput !== "") {
            const searchResults = await fetch(`https://api.themoviedb.org/3/search/${this.state.searchType}?api_key=${api_key}&language=en-US&query=${this.state.searchInput}&page=1&include_adult=false`)
            .then(response => response.json())
            .catch(error => console.log(error));
    
            this.props.getSearchResultsHandler(this.state.searchType, searchResults.results);
    
            this.setState(prev=>({
                ...prev,
                searchResults: searchResults.results
            }));
        }
    }

    getAutocompleteData = async(input) => {
        if(input !== "") {
            const searchResults = await fetch(`https://api.themoviedb.org/3/search/${this.state.searchType}?api_key=${api_key}&language=en-US&query=${input}&page=1&include_adult=false`)
            .then(response => response.json())
            .catch(error => console.log(error));

            this.setState(prev=>({
                ...prev,
                autocompleteList: searchResults.results
            }));
        }
    }  

    render() {
        return (
            <SearchAreaDiv>
                <Input
                    name="searchInput"
                    onChange={(e)=>{
                        this.onChange(e);
                        this.props.messageWhileTyping(e.target.value);
                        this.getAutocompleteData(e.target.value);
                    }}
                    value={this.state.searchInput}
                    placeholder="Search"
                    autocompleteList={this.state.autocompleteList} />
                <DropdownList
                    initialState={{searchType: 'multi'}}
                    name="searchType"
                    label="Search Type"
                    options={["movie", "multi", "tv"]}
                    onChange={this.onChange}
                />
                <Button onClick={this.searchHandler} />
            </SearchAreaDiv>
        );
    }
}

const SearchAreaDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    margin-bottom: 4rem;
`

export default SearchArea;