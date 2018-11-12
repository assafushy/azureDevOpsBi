import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


class App extends Component {

  constructor(){
    super();
    this.state = {
      
      "toggleDrawerMenu":true
    }
  }//constructor

  toggleDrawer(){
    (this.state.toggleDrawerMenu)?
    this.setState({"toggleDrawerMenu":false}):
    this.setState({"toggleDrawerMenu":true});
  }//toggleDrawer


  render() {
    return (
      <div className="App">
       <Drawer anchor="left" open={this.state.toggleDrawerMenu} onClose={()=>{this.toggleDrawer()}}>
          <div
            tabIndex={0}
            role="button"
            onClick={()=>{this.toggleDrawer()}}
            onKeyDown={()=>{this.toggleDrawer()}}
          >
           <List>
            <ListItem button key={'code'}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={'Code'} />
            </ListItem>
          </List> 
          </div>
        </Drawer>
      </div>
    );
  }
}

export default App;
