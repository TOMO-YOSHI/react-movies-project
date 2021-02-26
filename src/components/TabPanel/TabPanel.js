import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import DisplayArea from '../../components/DisplayArea';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "solid 1px #bbbbbb",
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
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" TabIndicatorProps={{style: {backgroundColor: "#3f51b5"}}} className={classes.Tabs}>
          <Tab label="Movies" {...a11yProps(0)} className={classes.Tab} />
          <Tab label="Search Results" {...a11yProps(1)} className={classes.Tab} />
          <Tab label="TV Shows" {...a11yProps(2)} className={classes.Tab} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <DisplayArea />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Search Results
      </TabPanel>
      <TabPanel value={value} index={2}>
        TV Shows
      </TabPanel>
    </div>
  );
}
