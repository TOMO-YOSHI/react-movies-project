import React, { Component } from 'react';
import DropdownList from '../elements/DropdownList/DropdownList';
import ListItem from './ListItem';
import styled from "styled-components";

const api_key = process.env.REACT_APP_MOVIES_API_KEY;

class DisplayArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "popular",
            searchResults: [],
        }

    }

    fetchData = async(category) => {
        const searchResults = await fetch(`https://api.themoviedb.org/3/${this.props.type}/${category}?api_key=${api_key}&language=en-US`)
        .then(response => response.json())
        .catch(error => console.log(error))

        this.setState(prev => ({
            ...prev,
            searchResults: searchResults.results
        }))
        // console.log(searchResults);
    }

    componentWillMount() {

    }

    componentDidMount() {
        if(this.props.type !== "search") {
            this.fetchData(this.state.category);
        }
        // else if (this.props.type === "search") {
        //     this.setState(prev => ({
        //         ...prev,
        //         searchResults: this.props.searchResults
        //     }))
        // }
    }

    componentWillReceiveProps(nextProps) {

    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("componentDidUpdate");
        // console.log(prevState);
        // console.log(this.state);
        if(prevState.category !== this.state.category) {
            // console.log("fetch");
            this.fetchData(this.state.category);

        }

        if(prevState.searchResults !== this.state.searchResults &&
            this.state.searchResults.length === 0) {
                this.setState(prev => ({
                    ...prev,
                    searchResultMessage: "Sorry, there were no results",
                }))
        }
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
            <div>
                {
                    this.props.type !== "search" ?
                    <DropdownList
                        initialState={{category: 'popular'}}
                        name="category"
                        label="Category"
                        options={this.props.dropdownOptions}
                        onChange={this.onChange}
                    />
                    : null
                }
                <List>
                {
                    this.state.searchResults.length !== 0 ?
                    this.state.searchResults.map(el=>{
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
                    })
                    : this.props.searchResults.length !== 0 && this.props.type === "search" ?
                    this.props.searchResults.map(el=>{
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
                        }) :
                    <MessageText>{this.props.searchResultMessage}</MessageText>
                }
                </List>
            </div>
        );
    }
}

const List = styled.ul`
    list-style-type: none;
    padding-left: 0
`;

const MessageText = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
`;

export default DisplayArea;