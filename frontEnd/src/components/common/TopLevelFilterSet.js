import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import SelectBox from '../common/SelectBox';
import {Grid} from '@material-ui/core';

export default class componentName extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item sm={4}>
            <SelectBox title="Team Projects FIlter" dataList={(this.props.globalData.teamProjectsData.value)?this.props.globalData.teamProjectsData:{value:[{name:'Fetching data'}]}}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}