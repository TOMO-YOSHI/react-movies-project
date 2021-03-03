import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: 0
  }
});

class ContainedButtons extends React.Component {

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
        <Button
            onClick={this.props.onClick}
            className={classes.button}
            variant="contained" color="primary">
            Search
        </Button>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContainedButtons);
