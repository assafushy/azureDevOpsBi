import React, { Component } from 'react'
import SelectBox from '../common/SelectBox';
import {Grid} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';

const ITEM_HEIGHT = 48;

export default class TopLevelFilterSet extends Component {
 
  constructor(){
    super();
    this. state = {
      anchorEl: null,
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Grid container spacing={8}>
          <Grid item sm={4}>
            <SelectBox title="Team Projects FIlter" dataList={(this.props.globalData.teamProjectsData.value)?this.props.globalData.teamProjectsData:{value:[{name:'Fetching data'}]}}/>
           </Grid>
          <Grid item sm={4}>
            <IconButton aria-label="More" aria-owns={'long-menu'} aria-haspopup="true" onClick={this.handleClick}>
              <FilterList/>
            </IconButton>
          </Grid>
        </Grid>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
        {(this.props.globalData.viewFilters)?
          this.props.globalData.viewFilters.map(option => (
            <MenuItem key={option._id} selected={option === 'Pyxis'} onClick={this.handleClose}>
              {option.createdBy}
            </MenuItem>
          )):
          null}
        </Menu>
      </div>
    )
  }
}
