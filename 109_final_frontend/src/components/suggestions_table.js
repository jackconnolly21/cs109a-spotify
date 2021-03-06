import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class SuggestionsTable extends Component {
  render() {

    return (
    	<Paper>
        <Toolbar>
          <Typography variant="h6" id="tableTitle">Suggested Song Additions: {this.props.name}</Typography>
          <div style={{flexGrow: 1}}></div>

          <Button variant="contained" color="secondary" onClick={() => this.props.refresh()}>Refresh</Button>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Song </TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>{this.props.score_name}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.data.map(row => {
            return (
              <TableRow hover>
                <TableCell>{row.song_name}</TableCell>
                <TableCell>{row.artist_name}</TableCell>
                <TableCell>{row.album_name}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.handler(row)}
                    >
                    Add
                    </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        </Table>
		  </Paper>
    	);
  }
}

export default SuggestionsTable;
