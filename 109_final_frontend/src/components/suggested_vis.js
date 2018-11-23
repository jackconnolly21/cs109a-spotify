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
	paddingRight: '30px'
}


class SuggestedVis extends Component {
  render() {
  	
    return (
    	<Paper style={style}> 
			<XYPlot height={500} width={400} xType="ordinal" margin={{bottom: 150}}>
			 	<XAxis tickLabelAngle={-90} />
  				<YAxis />
  				<HorizontalGridLines />
  				<VerticalBarSeries data={this.props.data} /> 
			</XYPlot>
		</Paper> 
    	);
  }
}

export default SuggestedVis;
