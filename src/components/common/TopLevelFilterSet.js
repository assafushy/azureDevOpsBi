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
        <Grid container spacing={6}>
          <Grid item sm={3}>
            <SelectBox title="Collections"/>
          </Grid>
          <Grid item sm={3}>
            <SelectBox title="Team Projects"/>
          </Grid>
        </Grid>
      </div>
    )
  }
}
