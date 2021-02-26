import React, { Component } from 'react';
import PropTypes from 'prop-types';

// elements
import Input from '../elements/Input/Input';
import DropdownList from '../elements/DropdownList/DropdownList';
import Button from '../elements/Button/Button';

import styled from "styled-components";

const api_key = process.env.REACT_APP_MOVIES_API_KEY;

class SearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            searchType: "multi",
        }
    }

    componentDidMount() {
        const data = fetch(`https://api.themoviedb.org/3/tv/550?api_key=${api_key}`)
    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.state);
        // console.log(this.state.searchType);
    }

    componentWillUnmount() {

    }

    onChange = (e) => {
        this.setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    render() {
        return (
            <SearchAreaDiv>
                <Input
                    name="searchInput"
                    onChange={this.onChange}
                    value={this.state.searchInput}
                    placeholder="Search" />
                <DropdownList
                    initialState={{searchType: 'multi'}}
                    name="searchType"
                    label="Search Type"
                    options={["movie", "multi", "tv"]}
                    onChange={this.onChange}
                />
                <Button />
            </SearchAreaDiv>
        );
    }
}

const SearchAreaDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3rem
`

export default SearchArea;