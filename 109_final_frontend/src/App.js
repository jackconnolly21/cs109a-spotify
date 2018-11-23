import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import SuggestedVis from './components/suggested_vis'
import CustomTable from './components/custom_table'
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/InputBase';



class App extends Component {
  
  
  handleChange = name => event => {
    return this.setState({name: event.target.value})

  }


  constructor(props) {
    super(props);
    this.state = { data: [], 
                  current_playlist: 
                    [{'artist_name': 'Miley Cyrus', 
                      'album_name' : 'No Idea', 
                      'song_name' : 'Party In The USA'}], 
                  add_name: '', 
                  };
  }

  componentDidMount(){
    fetch('http://127.0.0.1:8000/network-most-likely')
      .then(response => response.json())
      .then(data => this.setState({ data: data }));

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
      <Grid item xs={12}>
        <Grid container  justify="center" spacing={32}>
          <Grid item>
            <CustomTable data={this.state.current_playlist} /> 
          </Grid>
          <Grid item>
            <SuggestedVis data={this.state.data} />
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