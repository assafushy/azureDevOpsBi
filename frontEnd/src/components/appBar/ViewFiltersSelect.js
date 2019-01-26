import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';
import SaveIcon from '@material-ui/icons/Save';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ViewFilterSaveModal from './ViewFilterSaveModal';
import {saveNewViewFilter,setSelectedProjects} from '../../redux/actions/globalDataActions';

const ITEM_HEIGHT = 48;


class ViewFiltersSelect extends Component {
  
  constructor() {
    super();
    this. state = {
      anchorEl: null,
      openModal:false
    }
  }
  
  onCloseModal(){
    this.setState({openModal:false})
  }

  onSaveViewFilter(title){
    saveNewViewFilter(title);
    this.onCloseModal();
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleFilterSelection = (option) => {
    if(option === 'save'){
      this.setState({openModal:true});
    }else{
      setSelectedProjects(option);
    }
  }

  handleClose = () => {
    console.log()
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <ViewFilterSaveModal open={this.state.openModal} onSaveViewFilter={this.onSaveViewFilter.bind(this)} oncloseModal={this.onCloseModal.bind(this)}/>
        <IconButton aria-label="More" aria-owns={'long-menu'} aria-haspopup="true" onClick={this.handleClick}>
                  <FilterList/>
        </IconButton> 
        <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            }}}
        >
        <MenuItem
          onClick={()=>{
            this.handleFilterSelection('save');
            this.handleClose();
            
        }}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText inset primary="Save This View" />
        </MenuItem>

        {(this.props.data)?
          this.props.data.map(option => (
            <MenuItem
              key={option._id} 
              selected={option === 'Pyxis'} 
              onClick={()=>{
                this.handleClose()
                this.handleFilterSelection(option)
                }
              }>
              {option.title}
            </MenuItem>
          )):
          null}
        </Menu>
      </div>
    );
  }
}

export default ViewFiltersSelect;
