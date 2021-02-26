import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from "@material-ui/core/styles";

import "./DropdownList.css";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputCenter: {
    textAlignLast: "center",
  }
});

class DropdownList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.setState(this.props.initialState)
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({
        ...this.state,
        [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor={this.props.name}>{this.props.label}</InputLabel>
                <Select
                className={classes.inputCenter}
                // native
                value={this.state[this.props.name] ? this.state[this.props.name] : " "}
                onChange={(e)=>{
                    this.handleChange(e);
                    this.props.onChange(e);
                }}
                name={this.props.name}
                label={this.props.label}
                inputProps={{
                    name: this.props.name,
                    id: this.props.name,
                }}
                >
                {/* <option aria-label="None" value="" /> */}
                {/* {
                    this.props.options.map(el => {
                        return (
                            <option
                                value={el}
                                key={el}
                                name={this.props.name}
                                >{el}
                            </option>
                        )
                    })
                } */}
                {
                    this.props.options.map(el => {
                        return (
                            <MenuItem
                                value={el}
                                key={el}
                                name={this.props.name}
                                >{el}
                            </MenuItem>
                        )
                    })
                }
                </Select>
            </FormControl>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(DropdownList);