import React from 'react';

import { imageUrl } from '../data/urls';

import styled from "styled-components";

function ListItem(props) {
    return (
        <ListItemElement>
            <ListItemImage src={imageUrl + props.poster_path} />
            <ListItemTextDiv>
                <div>
                    <TitleText>{props.title}</TitleText>
                    <InfoText>
                        Release Date: {props.release_date}
                        &nbsp;|
                        Popularity: {props.popularity}
                    </InfoText>
                    <DescriptionText>
                        {props.overview}
                    </DescriptionText>
                </div>
            </ListItemTextDiv>
        </ListItemElement>
    );
}

const ListItemElement = styled.li`
    margin: 1rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 2px 6px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
`;

const ListItemImage = styled.img`
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const ListItemTextDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
`;

const TitleText = styled.p`
    font-weight: 400;
    font-size: 1.25rem;
    margin: .25rem;
`;

const InfoText = styled.p`
    font-size: 1rem;
    margin: 0;
    color: #888;
`;

const DescriptionText = styled.p`
    font-size: .8rem;
    margin: 0;
    margin-top: 1rem;
    color: #888;
    text-align: left;
`;

export default ListItem;