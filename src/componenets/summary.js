import React from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { fetchDate } from "../actions/dataAction";

class Summary extends React.Component {
  componentDidMount() {
    this.props.fetchDate();
  }
  render() {
    //create summary array of object
    const summaryData = this.props.log.flat(2);
    //combine prices and delete duplicate key "code" in new array updatedSummary
    const codes = summaryData.reduce((ns, { code, price }) => {
      if (!ns[code]) ns[code] = [];
      ns[code].push(price);
      return ns;
    }, {});
    //convert the obj to array to render it
    var summeryArr = Object.keys(codes).map(function(key) {
      return [key, codes[key]];
    });
    //console.log(summeryArr);

    return (
      <div>
        <Typography variant="h4" component="h4" gutterBottom>
          summary
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stock</TableCell>
              <TableCell align="right">Starting</TableCell>
              <TableCell align="right">Lowest</TableCell>
              <TableCell align="right">Heighest</TableCell>
              <TableCell align="right">Current</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summeryArr.map(function(data, indx) {
              return (
                <TableRow key={indx}>
                  <TableCell scope="row">{data[0]}</TableCell>
                  <TableCell align="right">{data[1].shift()}</TableCell>
                  <TableCell align="right">
                    {Math.min.apply(null, data[1])}
                  </TableCell>
                  <TableCell align="right">
                    {Math.max.apply(null, data[1])}
                  </TableCell>
                  <TableCell align="right">
                    {data[1][data[1].length - 1]}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  log: state.log.summary
});

export default connect(
  mapStateToProps,
  { fetchDate }
)(Summary);
