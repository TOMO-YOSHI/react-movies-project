import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';

const styles = (theme) => ({
    root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
});

class PaginationComponent extends React.Component {    
    render() {
        const { classes, length } = this.props;
        const pages = Math.ceil(length / 10);
        
        return (
            <div className={classes.root}>
                <Pagination count={pages}  onChange={(event, page) => this.props.getPageNumber(page)} />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PaginationComponent);
