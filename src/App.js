import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect,} from 'react-redux';
import MainBar from './components/appBar/MainBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeDashboard from './components/codePage/CodeDashboard';
import CodeIcon from '@material-ui/icons/Code';

class App extends Component {

  constructor(){
    super();
    this.state = {   
      "toggleDrawerMenu":false
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
      <MainBar toggleMenu={this.toggleDrawer.bind(this)}/>
       <Drawer anchor="left" open={this.state.toggleDrawerMenu} onClose={()=>{this.toggleDrawer()}}>
          <div
            tabIndex={0}
            role="button"
            onClick={()=>{this.toggleDrawer()}}
            onKeyDown={()=>{this.toggleDrawer()}}
          >
           <List>
            <ListItem button key={'code'}>
              <ListItemIcon><CodeIcon/></ListItemIcon>
              <ListItemText primary={'Code'} />
            </ListItem>
          </List> 
          </div>
        </Drawer>
        <CodeDashboard/>
      </div>
    );
  }
}


function mapStateToProps(state){
  return{
      
  }
}

function matchDispachToProps(dispatch){
  return bindActionCreators({
      
  }
  ,dispatch)
}

export default connect(mapStateToProps,matchDispachToProps)(App);
