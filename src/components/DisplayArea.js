import React, { Component } from 'react';
import DropdownList from '../elements/DropdownList/DropdownList';
import ListItem from './ListItem';
import { imageUrl } from '../data/urls';
import styled from "styled-components";

const api_key = process.env.REACT_APP_MOVIES_API_KEY;

class DisplayArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "popular",
            searchResults: []
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
        this.fetchData(this.state.category);
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
                <DropdownList
                    initialState={{category: 'popular'}}
                    name="category"
                    label="Category"
                    options={this.props.dropdownOptions}
                    onChange={this.onChange}
                />
                <List>
                {
                    this.state.searchResults.length
                    ?
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
                    :
                    <p>No Results</p>
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

// const ListItem = styled.li`
//     margin: 1rem;
//     display: grid;
//     grid-template-columns: 1fr 3fr;
//     box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.19);
//     border-radius: 5px;
// `;

// const ListItemImage = styled.img`
//     border-top-left-radius: 5px;
//     border-bottom-left-radius: 5px;
// `;

// const ListItemTextDiv = styled.div`
//     display: flex;
//     align-items: center;
//     padding: 1rem;
// `;

// const TitleText = styled.p`
//     font-weight: 400;
//     font-size: 1.25rem;
//     margin: .25rem;
// `;

// const InfoText = styled.p`
//     font-size: 1rem;
//     margin: 0;
//     color: #888;
// `;

// const DescriptionText = styled.p`
//     font-size: .8rem;
//     margin: 0;
//     margin-top: 1rem;
//     color: #888;
//     text-align: left;
// `;

export default DisplayArea;