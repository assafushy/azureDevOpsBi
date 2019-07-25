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

class PolicyByRepoTable extends Component {
  gatedBuildCellFactory(policies = []) {
    let cellColor = null;
    let txt = policies.map(policy => {
      let cellText = "";
      if (policy.type.displayName === "Build") {
        cellColor =
          policy.isBlocking || policy.isEnabled ? "lightyellow" : null;
        cellColor =
          policy.isEnabled && policy.isBlocking ? "lightgreen" : cellColor;
        cellText += `${policy.settings.buildDefinitionId} #Build -`;
        policy.settings.scope.map(scope => {
          cellText += ` ${scope.refName} - #${scope.matchKind} `;
        });
      }
      return cellText;
    });
    return (
      <CustomTableCell style={{ background: cellColor }}>{txt}</CustomTableCell>
    );
  } //gatedBuildCellFactory

  reviewrsCellFactory(policies = []) {
    let cellColor = null;
    let txt = policies.map(policy => {
      let cellText = "";
      if (policy.type.displayName === "Minimum number of reviewers") {
        cellColor =
          policy.isBlocking || policy.isEnabled ? "lightyellow" : null;
        cellColor =
          policy.isEnabled && policy.isBlocking ? "lightgreen" : cellColor;
        cellText += `${policy.settings.minimumApproverCount} reviewers -`;
        policy.settings.scope.map(scope => {
          cellText += ` ${scope.refName} - #${scope.matchKind} `;
        });
      }
      return cellText;
    });
    return (
      <CustomTableCell style={{ background: cellColor }}>{txt}</CustomTableCell>
    );
  } //reviewrsCellFactory

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Repo Name</CustomTableCell>
              <CustomTableCell>NO.Reviewers - Branch</CustomTableCell>
              <CustomTableCell>Gated Build - Branch</CustomTableCell>
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
                  {this.reviewrsCellFactory(repo.policyList)}
                  {this.gatedBuildCellFactory(repo.policyList)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default withStyles(styles)(PolicyByRepoTable);
