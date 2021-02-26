import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import DisplayArea from './DisplayArea';

import { withStyles } from "@material-ui/core/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    border: "solid 1px #000000",
    margin: "3rem auto",
    maxWidth: "1100px",
    backgroundColor: theme.palette.background.paper,
    '& .MuiTabs-flexContainer': {
      justifyContent: "space-evenly"
    },
    '& .MuiTab-root': {
      maxWidth: "500px"
    }
  },
  AppBar: {
    backgroundColor: "#eee", color: "inherit"
  },
  Tabs: {
    justifyContent: "space-between",
    
  },
  Tab: {
    flexGrow: 5,
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.AppBar}>
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" TabIndicatorProps={{style: {backgroundColor: "#3f51b5"}}} className={classes.Tabs}>
            <Tab label="Movies" {...a11yProps(0)} className={classes.Tab} />
            <Tab label="Search Results" {...a11yProps(1)} className={classes.Tab} />
            <Tab label="TV Shows" {...a11yProps(2)} className={classes.Tab} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <DisplayArea type="movie" dropdownOptions={["now_playing", "popular", "top_rated", "upcoming"]}
          searchResults={this.props.searchResults}
        />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <DisplayArea
            type="search"
            dropdownOptions={null}
            searchResults={this.props.searchResults}
            searchType={this.props.searchType}
            searchResultMessage={this.props.searchResultMessage}
          />
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
        <DisplayArea
          type="tv"
          dropdownOptions={["airing_today", "on_the_air", "popular", "top_rated" ]}
          searchResults={this.props.searchResults}
        />
        </TabPanel>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SimpleTabs);