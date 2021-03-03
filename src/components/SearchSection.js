import React, { Component } from 'react';
import styled from "styled-components";

// elements
import Input from './elements/Input/Input';
import DropdownList from './elements/DropdownList/DropdownList';
import Button from './elements/Button/Button';

// url
import { apiUrl } from '../data/urls';
const api_key = process.env.REACT_APP_MOVIES_API_KEY;

class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            searchType: "multi",
            autocompleteList: [],
        }
    }

    onChangeSelect = (event, value) => {
        this.setState(prev => ({
            ...prev,
            searchInput: value,
        }))
    }
    onChange = (e) => {
        this.setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    getAutocompleteData = async(input) => {
        if(input !== "") {
            const searchResults = await fetch(`${apiUrl}/search/${this.state.searchType}?api_key=${api_key}&language=en-US&query=${input}&page=1&include_adult=false`)
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
            <SearchSectionDiv>
                <Input
                    name="searchInput"
                    onChange={(e)=>{
                        this.onChange(e);
                        this.props.messageWhileTyping(e.target.value);
                        this.getAutocompleteData(e.target.value);
                    }}
                    onChangeSelect={this.onChangeSelect}
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
                <Button onClick={(e)=>this.props.searchHandler(e,this.state.searchType, this.state.searchInput)} />
            </SearchSectionDiv>
        );
    }
}

const SearchSectionDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    margin-bottom: 4rem;
`

export default SearchSection;