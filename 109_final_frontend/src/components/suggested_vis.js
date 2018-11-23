import React, { Component } from 'react';
import {XYPlot, 
	VerticalBarSeries, 
	XAxis, 
	YAxis, 
	HorizontalGridLines} from 'react-vis';

class SuggestedVis extends Component {
  render() {
  	
    return (
    	<div> 
			<XYPlot height={500} width={400} xType="ordinal" margin={{bottom: 150}}>
			 	<XAxis tickLabelAngle={-90} />
  				<YAxis />
  				<HorizontalGridLines />
  				<VerticalBarSeries data={this.props.data} /> 
			</XYPlot>
		</div> 
    	);
  }
}

export default SuggestedVis;
