import React, { Component } from "react";
import Summary from "./componenets/summary";
import Log from "./componenets/log";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Log />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Summary />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Provider>
    );
  }
}

export default App;
