import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropdownList from '../elements/DropdownList/DropdownList';

import { imageUrl } from '../data/urls';

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
        const searchResults = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}&language=en-US`)
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
                    options={["now_playing", "popular", "top_rated", "upcoming"]}
                    onChange={this.onChange}
                />
                {
                    this.state.searchResults.length
                    ?
                    this.state.searchResults.map(el=>{

                        return (
                            <p key={el.id}>{el.title}</p>
                        )
                    })
                    :
                    <p>No Results</p>
                }
            </div>
        );
    }
}

DisplayArea.propTypes = {

};

export default DisplayArea;