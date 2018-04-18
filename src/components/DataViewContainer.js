import React from 'react';
import {ShotChart} from "./ShotChart";
import {CountSlider} from "./CountSlider"

import { Radio, Row, Col } from 'antd';
const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    // initial state
    state = {
        minCount : 5,
        chartType: 'hexbin'
    }

    // function传下去， 这个function一旦被触发，re-render
    onCountSliderChange = (count) => {
        this.setState( { minCount : count } );
        console.log('DataViewContainer minCount=' + count); // if change, 就对了。问题是，当滑动slider时，这个count确实在变，可是没有发生re-render，why?
    }

    onChartTypeChange = (e) => {
        this.setState( {chartType: e.target.value} );
    }

    render() {
        return(

            // 现在有两个平行的component (ShortCount, ShotChart)，如何communication？ CountSlider 变化，如何影响ShotChart?
            // LCA！！！ e.g. parent: DataViewContainer children: ShotChart,  CountSlider
            // now, CountSlider changes, trigger DataViewContainer, then DataViewContainer re-render, children then change
            // 想让lca变，加一个state
            <div className='data-view'>
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                />

                <div className='filters'>
                    {/*// conditional render!*/}
                    {this.state.chartType === 'hexbin' ? <CountSlider onCountSliderChange={this.onCountSliderChange}/> : null}

                    <Row>
                        <Col span={12} offset={2}>
                            <RadioGroup onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value='hexbin'>Hexbin</Radio>
                                <Radio value='scatter'>Scatter</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={6}>

                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}