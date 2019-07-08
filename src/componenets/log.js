import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { fetchDate } from "../actions/dataAction";

class Log extends React.Component {
  constructor() {
    super();
    this.state = {
      btnTxt: "Pause",
      interval: 0,
      dateTime: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.formatedDate = this.formatedDate.bind(this);
  }
  componentDidMount() {
    this.props.fetchDate();
    let interval = setInterval(
      () => this.props.fetchDate(),
      this.setState({
        dateTime: this.formatedDate()
      }),
      2000
    );
    this.setState({ interval: interval });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval, this.state.dateTime);
  }
  formatedDate() {
    const timestamp = new Date();
    const formatedDate = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(timestamp);
    return formatedDate;
  }
  handleClick() {
    if (this.state.btnTxt === "Pause") {
      this.setState({
        btnTxt: "Resume"
      });
      clearInterval(this.state.interval);
    } else {
      this.setState({
        btnTxt: "Pause"
      });
      let interval = setInterval(
        () => this.props.fetchDate(),
        this.setState({
          dateTime: this.formatedDate()
        }),
        2000
      );
      this.setState({ interval: interval });
    }
  }

  render() {
    var logData = this.props.log;
    var dt = this.state.dateTime;
    //convert the obj to array to render it
    var logArr = Object.keys(logData).map(function(key) {
      return [logData[key]];
    });

    return (
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Typography variant="h4" component="h4" gutterBottom>
            Log
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={this.handleClick}
            variant="contained"
            color="primary"
          >
            {this.state.btnTxt}
          </Button>
          <div className="clearFix" />
        </Grid>
        <div className="log-container">
          {logArr.reverse().map(function(d, idx) {
            //console.log(logArr.reverse());
            return (
              <div key={idx}>
                <Typography variant="h6" component="h6" gutterBottom>
                  <b>Updates for {dt}</b>
                </Typography>
                <Typography variant="h6" component="h6" gutterBottom>
                  {d[0].map(function(x, ndx) {
                    return (
                      <div key={ndx}>
                        {x.code}: {x.price}
                      </div>
                    );
                  })}
                </Typography>
                <hr />
              </div>
            );
          })}
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  log: state.log.logs,
  btnTxt: state.log.btnTxt
});

export default connect(
  mapStateToProps,
  { fetchDate }
)(Log);
