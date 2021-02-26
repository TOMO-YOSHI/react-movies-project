/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './Input.css';

export default function Input(props) {
  return (
    <div style={{ minWidth: "300px", maxWidth: "400px", width: "100%", position: "relative" }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        disableClearable
        options={
          props.autocompleteList.map((option) => {
            if (option.name) {
              return option.name;
            } else if (option.title) {
              return option.title;
            } else {
              return "";
            }
          }
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            margin="normal"
            variant="outlined"
            onChange={props.onChange}
            name={props.name}
            />
        )}
      />
    </div>
  );
}