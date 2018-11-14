import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
// import PropTypes from 'prop-types'

export default class componentName extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <div>
        <FormControl>
                <InputLabel style={{color:'white'}} htmlFor="select-multiple-checkbox">{this.props.title}</InputLabel>
                <Select
                  multiple
                  value={[]}
                  onChange={()=>{}}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected=>selected}
                  style={{minWidth:150,color:'white'}}
                >
                  {['ElisraCollection','ModinCollection'].map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={true} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                  </Select>
                 </FormControl> 
              
      </div>
    )
  }
}
