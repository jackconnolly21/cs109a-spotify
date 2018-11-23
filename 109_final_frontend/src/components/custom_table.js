import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import Paper from '@material-ui/core/Paper';


class CustomTable extends Component {
  render() {

    return (
    	<div>  
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Song </TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Album</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.data.map(row => {
            return (
              <TableRow>
                <TableCell>{row.song_name}</TableCell>
                <TableCell>{row.artist_name}</TableCell>
                <TableCell>{row.album_name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        </Table> 

		  </div> 
    	);
  }
}

export default CustomTable;
