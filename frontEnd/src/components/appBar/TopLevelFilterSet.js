import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import SelectBox from '../common/SelectBox';
import {Grid} from '@material-ui/core';

import ViewFiltersSelect from './ViewFiltersSelect';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class TopLevelFilterSet extends Component {
 
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item sm={4}>
            <SelectBox title="Team Projects FIlter" dataList={(this.props.globalData.teamProjectsData.value)?this.props.globalData.selectedTeamProject:{value:[{name:'Fetching data'}]}}/>
           </Grid>
          <Grid item sm={4}>
             <ViewFiltersSelect data={this.props.globalData.viewFilters}/>   
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(TopLevelFilterSet);