import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import {SelectedDeselectProjects} from '../../redux/actions/globalDataActions';
import store from '../../redux/store';

export default class componentName extends Component {
  
  isSelected(isSelected){
    if(isSelected){
      return true
    }else{
      if(isSelected === undefined){
        return true;
      }
      return false;
    }
  }//isSelected

  render() {
    return (
      <div>
        <FormControl>
          <InputLabel style={{color:'white',fontSize:15}} htmlFor="select-multiple-checkbox">
            {this.props.title}
          </InputLabel>
          <Select
            multiple
            value={[]}
            onChange={(e,child)=>{store.dispatch(SelectedDeselectProjects(child.key))}}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected=>selected}
            style={{minWidth:200,color:'white',}}
          >
            {(this.props.dataList !== 0 && this.props.dataList !== undefined)?
              this.props.dataList.value.map(item => (
              <MenuItem key={item.id} value={item.name}>
                <Checkbox checked={this.isSelected(item.selected)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))
            : null}
            </Select>
        </FormControl>      
      </div>
    )
  }
}
