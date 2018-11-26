import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



class CustomTable extends Component {
    constructor(props) {
      super(props);
      this.state = {page: 0, rows_per_page: 10}; 
  }


  handle_page_change = (event, page) => {
    this.setState({page});
  }

  handle_rows_per_page_change = (event) => {
    this.setState({rows_per_page: event.target.value});
  }



  render() {

    const empty_rows = this.state.rows_per_page - Math.min(this.state.rows_per_page, this.props.data.length - this.state.page * this.state.rows_per_page);

    return (
    	<Paper>
        <Toolbar >
          <Typography>Current Playlist</Typography> 
        </Toolbar>   
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Song </TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Album</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.data
            .slice(this.state.page * this.state.rows_per_page, this.state.page *  this.state.rows_per_page + this.state.rows_per_page)
            .map(row => {
            return (
              <TableRow hover>
                <TableCell>{row.song_name}</TableCell>
                <TableCell>{row.artist_name}</TableCell>
                <TableCell>{row.album_name}</TableCell>
              </TableRow>
            );
          })}
          {empty_rows> 0 && (
                <TableRow style={{ height: 49 * empty_rows }}>
                  <TableCell colSpan={6} />
                </TableRow>
          )}
        </TableBody>
        </Table> 
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={this.props.data.length}
          rowsPerPage={this.state.rows_per_page}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handle_page_change}
          onChangeRowsPerPage={this.handle_rows_per_page_change}
        />
		  </Paper> 
    	);
  }
}

export default CustomTable;
