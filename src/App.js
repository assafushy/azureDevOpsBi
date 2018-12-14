import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAllServerProjects } from "./redux/actions/globalDataActions";
import { setSelectedProjects } from "../src/redux/actions/globalDataActions";

import MainBar from "./components/appBar/MainBar";
import Drawer from "@material-ui/core/Drawer";
import CodeDashboard from "./components/codePage/CodeDashboard";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CodeIcon from "@material-ui/icons/Code";
import Button from "@material-ui/core/Button";
import CachedIcon from "@material-ui/icons/Cached";
import Divider from "@material-ui/core/Divider";

const fabStyle = {
  bottom: 20,
  right: 10,
  position: "fixed"
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      toggleDrawerMenu: false
    };
  } //constructor

  componentDidMount() {
    this.props.fetchAllServerProjects();
  } //componentDidMount

  toggleDrawer() {
    this.state.toggleDrawerMenu
      ? this.setState({ toggleDrawerMenu: false })
      : this.setState({ toggleDrawerMenu: true });
  } //toggleDrawer

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div />
        <Divider />
        <List>
          {["Code", "Build", "Test", "Release"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Settings"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className="App">
        <MainBar
          toggleMenu={this.toggleDrawer.bind(this)}
          globalData={this.props.globalData}
        />
        <Drawer
          anchor="left"
          open={this.state.toggleDrawerMenu}
          onClose={() => {
            this.toggleDrawer();
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              this.toggleDrawer();
            }}
            onKeyDown={() => {
              this.toggleDrawer();
            }}
          >
            {drawer}
          </div>
        </Drawer>
        <CodeDashboard
          globalData={this.props.globalData}
          codeData={this.props.codeData}
        />
        <Button
          style={fabStyle}
          onClick={() => {
            setSelectedProjects();
          }}
          variant="fab"
          color="primary"
          aria-label="Add"
        >
          <CachedIcon />
        </Button>
      </div>
    );
  } //render
} //class

function mapStateToProps(state) {
  return {
    globalData: state.globalData,
    codeData: state.codeData
  };
} //mapStateToProps

function matchDispachToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAllServerProjects
    },
    dispatch
  );
} //matchDispachToProps

export default connect(
  mapStateToProps,
  matchDispachToProps
)(App);
