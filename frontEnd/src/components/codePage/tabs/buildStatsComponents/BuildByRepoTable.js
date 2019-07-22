import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import GitLogo from "../../../../imgs/GitLogo.png";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  card: {
    maxWidth: 150
  },
  title: {
    fontSize: 25,
    strong: true
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class BuildByRepoTable extends Component {
  statusCalculator(definitionsCount = 0, CiCount = 0) {
    if (definitionsCount > 0) {
      if (CiCount > 0) {
        return "Excellent!";
      } else {
        return "OK";
      } //if
    } else {
      return "NOT GOOD!";
    } //if
  } //statusCalculator

  triggerBranchesToString(buildDefList = []) {
    let triggetBranchList = "";
    buildDefList.map(build => {
      if (build.triggers) {
        build.triggers.map(trigger => {
          trigger.branchFilters.map(branch => {
            triggetBranchList += branch + " ";
            return true;
          });
          return true;
        });
      } //if
      return true;
    });
    return triggetBranchList;
  } //triggerBranchesToString

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Repo Name</CustomTableCell>
              <CustomTableCell numeric>Number Of Builds</CustomTableCell>
              <CustomTableCell numeric>Number Of CI Builds</CustomTableCell>
              <CustomTableCell>Trigger Branches</CustomTableCell>
              <CustomTableCell>Status</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((repo, i) => {
              return (
                <TableRow className={classes.row} key={1}>
                  <CustomTableCell component="th" scope="row">
                    <Grid key={i} container spacing={12}>
                      <Grid item sm={1}>
                        <img src={GitLogo} alt="logo" width="20" height="20" />
                      </Grid>
                      <Grid item sm={11}>
                        <Typography color="textSecondary">
                          {repo.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CustomTableCell>
                  <CustomTableCell numeric>{repo.count}</CustomTableCell>
                  <CustomTableCell numeric>{repo.CICount}</CustomTableCell>
                  <CustomTableCell>
                    {this.triggerBranchesToString(repo.buildDefentionList)}
                  </CustomTableCell>
                  <CustomTableCell>
                    {this.statusCalculator(repo.count, repo.CICount)}
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default withStyles(styles)(BuildByRepoTable);
