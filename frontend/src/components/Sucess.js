import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

export class Sucess extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Sucess" />
          <h1>Thank You for Your Submission</h1>
          <p>Completed</p>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Sucess;
