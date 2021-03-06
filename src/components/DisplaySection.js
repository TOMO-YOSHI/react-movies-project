import React, { Component } from 'react';
import DropdownList from './elements/DropdownList/DropdownList';
import ListItem from './ListItem';
import styled from "styled-components";

import PaginationComponent from './PaginationComponent';

// url
import { apiUrl } from '../data/urls';
const api_key = process.env.REACT_APP_MOVIES_API_KEY;

class DisplaySection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "popular",
            categoryResults: [],
            page: 1,
        }
    }

    fetchData = async(category) => {
        const categoryResults = await fetch(`${apiUrl}/${this.props.type}/${category}?api_key=${api_key}&language=en-US`)
        .then(response => response.json())
        .catch(error => console.log(error))

        this.setState(prev => ({
            ...prev,
            categoryResults: categoryResults.results
        }))
        // console.log(categoryResults);
    }

    componentDidMount() {
        if(this.props.type !== "search") {
            this.fetchData(this.state.category);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.category !== this.state.category) {
            this.fetchData(this.state.category);
        }
    }

    onChange = (e) => {
        this.setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    getPageNumber = (page) => {
        this.setState(prev => ({
            ...prev,
            page: page
        }))
    }

    render() {
        return (
            <div>
                {
                    this.props.type !== "search" ?
                    <DropdownWrapperDiv>
                        <DropdownList
                            initialState={{category: 'popular'}}
                            name="category"
                            label="Category"
                            options={this.props.dropdownOptions}
                            onChange={this.onChange}
                        />
                    </DropdownWrapperDiv>
                    : null
                }
                <List>
                {
                    this.state.categoryResults.length !== 0 ?
                    <>
                    {
                        this.state.categoryResults.map((el,i)=>{

                            if ( 0 + (this.state.page - 1) * 10 <= i && i <= (this.state.page - 1) * 10 + 9 ) {

                                return (
                                    <ListItem
                                        key={el.id}
                                        poster_path={el.poster_path}
                                        title={
                                            this.props.type === "movie" ?
                                            el.title
                                            : this.props.type === "tv" ?
                                            el.original_name
                                            : null
                                        }
                                        release_date={el.release_date}
                                        popularity={el.popularity}
                                        overview={el.overview}
                                    />
                                )
                            }
                        })
                    }
                    <PaginationComponent length={this.state.categoryResults.length} getPageNumber={this.getPageNumber} />
                    </>
                    : this.props.searchResults.length !== 0 && this.props.type === "search" ?
                    <>
                    {
                        this.props.searchResults.map((el,i)=>{

                            if ( 0 + (this.state.page - 1) * 10 <= i && i <= (this.state.page - 1) * 10 + 9 ) {

                                return (
                                    <ListItem
                                        key={el.id}
                                        poster_path={el.poster_path}
                                        title={
                                            this.props.type === "movie" ?
                                            el.title
                                            : this.props.type === "tv" ?
                                            el.name
                                            : this.props.type === "search" && el.media_type === "movie" ?
                                            el.title
                                            : this.props.type === "search" && el.media_type === "tv" ?
                                            el.name
                                            : this.props.searchType === "movie" ?
                                            el.title
                                            : this.props.searchType === "tv" ?
                                            el.name
                                            : null
                                        }
                                        release_date={el.release_date}
                                        popularity={el.popularity}
                                        overview={el.overview}
                                    />
                                )
                            }
                        })
                    }
                    <PaginationComponent length={this.props.searchResults.length} getPageNumber={this.getPageNumber} />
                    </>
                    :
                    <MessageText>{this.props.searchResultMessage}</MessageText>
                }
                </List>
            </div>
        );
    }
}

const DropdownWrapperDiv = styled.div`
    margin: 2rem auto 4rem;
`;

const List = styled.ul`
    list-style-type: none;
    padding-left: 0
`;

const MessageText = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
`;

export default DisplaySection;