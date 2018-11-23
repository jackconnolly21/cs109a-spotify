import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import SuggestedVis from './components/suggested_vis'
import CustomTable from './components/custom_table'
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/InputBase';
import SuggestionsTable from './components/suggestions_table'


class App extends Component {
  
  
  handleChange = name => event => {
    return this.setState({name: event.target.value})

  }

  update_predictions() {
    fetch('http://127.0.0.1:8000/network-most-likely', {
      method: 'post',
      headers: {
            "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({'songs' : this.state.current_playlist.map(row => {return row.song_name})}) 
      })
      .then(response => response.json())
      .then(data => this.setState({ vis_data: data.vis_data, suggestion_data: data.suggestion_data }));
  }

  add_song_handler (name)  {
      // Get the info for the song trying to be added 
      fetch('http://127.0.0.1:8000/song-to-info', {
      method: 'post',
      headers: {
            "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({'song' : name}) 
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          var new_playlist = this.state.current_playlist.concat(data.data);
          this.setState({current_playlist: new_playlist}); 
          this.update_predictions()
        }
        else {
          alert('Error Adding Song')
        }

      });
      // .then(data => this.setState({ vis_data: data.vis_data, suggestion_data: data.suggestion_data }));
  }


  constructor(props) {
    super(props);
    this.state = { vis_data: [],
                    suggestion_data: [],  
                  current_playlist: 
                    [{'artist_name': 'Miley Cyrus', 
                      'album_name' : 'The Time of Our Lives', 
                      'song_name' : 'Party In The U.S.A.'}], 
                  add_name: '', 
                  };

  }

  componentDidMount(){
    this.update_predictions(); 

  }

  render() {

    return (
      <div>   
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            CS109a Playlist Builder
          </Typography>
          <div style={{flexGrow: 1}}></div> 
          <div >
            <TextField style={{backgroundColor: 'white'}}/> 
          </div>
        </Toolbar>
      </AppBar>

      <Grid item xs={12} style={{paddingTop: '10%'}}>
        <Grid container  justify="center" spacing={32}>
          <Grid item style={{width: '50%'}}>
            <CustomTable data={this.state.current_playlist} /> 
            <SuggestionsTable data={this.state.suggestion_data} handler={this.add_song_handler.bind(this)}/> 
          </Grid>
          <Grid item>
            <SuggestedVis data={this.state.vis_data} />
          </Grid>
        </Grid>
      </Grid>

    </div> 
    );
  }
}

export default App;

      // <div> 
      //   <CustomTable/> 
      //   <SuggestedVis data={this.state.data} />
      // </div>