import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import SuggestedVis from './components/suggested_vis'
import CustomTable from './components/custom_table'
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SuggestionsTable from './components/suggestions_table'


class App extends Component {



  handleChange = name => event => {
    return this.setState({name: event.target.value})

  }

  update_predictions() {
    fetch('http://ec2-3-16-137-40.us-east-2.compute.amazonaws.com:8000/network-most-likely', {
      method: 'post',
      headers: {
            "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({'songs' : this.state.current_playlist.map(row => {return row.uri})})
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ network_vis_data: data.vis_data, network_suggestion_data: data.suggestion_data });
      });

      // Fetch predictions from cluster
      fetch('http://127.0.0.1:8000/cluster-most-likely', {
        method: 'post',
        headers: {
              "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({'songs' : this.state.current_playlist.map(row => {return row.uri})})
        })
        .then(response => response.json())
        .then(data => {
          this.setState({ cluster_vis_data: data.vis_data, cluster_suggestion_data: data.suggestion_data });
        });
  }

  add_song_handler (row)  {
      const new_row = {'artist_name' : row.artist_name,
                        'song_name' : row.song_name,
                        'album_name' : row.album_name,
                        'uri' : row.uri,
                      };
      const new_playlist = this.state.current_playlist.concat(new_row);

      this.setState({current_playlist: new_playlist}, this.update_predictions);
      // console.log(this.state.current_playlist)
      // this.update_predictions();

  }


  constructor(props) {
    super(props);
    this.state = { network_vis_data: [],
                    network_suggestion_data: [],
                    cluster_vis_data: [],
                    cluster_suggestion_data: [],
                  current_playlist:
                    [{'artist_name': 'Miley Cyrus',
                      'album_name' : 'The Time of Our Lives',
                      'song_name' : 'Party In The U.S.A.',
                      'uri' : 'spotify:track:5Q0Nhxo0l2bP3pNjpGJwV1'}],
                    // [{'artist_name': 'Future',
                    //   'album_name' : 'FUTURE',
                    //   'song_name' : 'Mask Off',
                    //   'uri' : 'spotify:track:0VgkVdmE4gld66l8iyGjgx'}],
                      // [{'artist_name': 'John Mayer',
                      // 'song_name': 'Waiting On the World to Change',
                      // 'album_name': 'Continuum',
                      // 'uri' : 'spotify:track:5imShWWzwqfAJ9gXFpGAQh'}],
                  add_name: '',
                  };

  }



  componentDidMount(){
    this.update_predictions();
  }

  render() {

    return (
      <div style={{backgroundColor: '#DCDCDC', height: '100vh'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            CS109a Playlist Builder
          </Typography>
          <div style={{flexGrow: 1}}></div>
          <div style={{width: '250px'}}>
          </div>
        </Toolbar>
      </AppBar>

      <Grid item xs={12} style={{paddingTop: '150px'}}>
        <Grid container  justify="center" spacing={32}>
          <Grid item style={{width: '600px'}}>
            <CustomTable data={this.state.current_playlist} />
          </Grid>
          <Grid item style={{width: '800px', height: '500px'}}>
            <SuggestionsTable
                data={this.state.network_suggestion_data}
                handler={this.add_song_handler.bind(this)}
                refresh={this.update_predictions.bind(this)}
                name="Network"
                score_name="Score"
            />
            <div style={{height: '10px'}}> </div>
            <SuggestionsTable
                data={this.state.cluster_suggestion_data}
                handler={this.add_song_handler.bind(this)}
                refresh={this.update_predictions.bind(this)}
                name="Cluster Model"
                score_name="Distance"
            />
          </Grid>
          <Grid item>
            <SuggestedVis data={this.state.network_vis_data} />
          </Grid>
        </Grid>
      </Grid>
    </div>
    );
  }
}

export default App;
