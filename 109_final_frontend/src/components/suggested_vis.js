import React, { Component } from 'react';
import {XYPlot,
	VerticalBarSeries,
	XAxis,
	YAxis,
	HorizontalGridLines} from 'react-vis';
import Paper from '@material-ui/core/Paper';

const style = {
	paddingTop: '30px',
	paddingBottom: '30px',
	paddingLeft: '30px',
	paddingRight: '30px',
	textAlign: 'center'
}


class SuggestedVis extends Component {
  render() {

    return (
    	<Paper style={style}>
    		Network Song Predictions (Likelyhood)
			<XYPlot height={500} width={400} xType="ordinal" margin={{bottom: 150}}>
			 	<XAxis tickLabelAngle={-90}  title="Song"/>
  				<YAxis title="Prediction Score"/>
  				<HorizontalGridLines />
  				<VerticalBarSeries data={this.props.data} />
			</XYPlot>
		</Paper>
    	);
  }
}

export default SuggestedVis;
