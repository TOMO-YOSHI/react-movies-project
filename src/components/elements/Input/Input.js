import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './Input.css';

class Input extends React.Component {
  render() {
    return (
      <div style={{ minWidth: "300px", maxWidth: "400px", width: "100%", position: "relative" }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          disableClearable
          onChange={(event, value)=> {
            // console.log(value)
            this.props.onChangeSelect(event, value)}}
          options={
            this.props.autocompleteList.map((option) => {
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
              onChange={this.props.onChange}
              name={this.props.name}
              />
          )}
        />
      </div>
    );  
  }
}

export default Input;
