import React from 'react';
import nba from 'nba';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';
import PropTypes from 'prop-types';

window.d3_hexbin = {hexbin : hexbin}; // workaround library problem

export class ShotChart extends React.Component {
    static propTypes = {
        playerId: PropTypes.number,
        minCount: PropTypes.number.isRequired
    }

    componentDidUpdate() {
        nba.stats.shots({  // nba 是个lib, google search npm nba, 里面又各种API
            PlayerID: this.props.playerId
        }).then((response) => {
            const final_shots = response.shot_Chart_Detail.map(shot => ({
                x: (shot.locX + 250) / 10,
                y: (shot.locY + 50) / 10,
                action_type: shot.actionType,
                shot_distance: shot.shotDistance,
                shot_made_flag: shot.shotMadeFlag,
            }));

            const courtSelection = d3.select("#shot-chart");

            courtSelection.html(''); // clean up old chart; !!! 如果没有，ShotChart不变！！！

            const chart_court = court().width(500);
            console.log('ShotChart: minCount=' + this.props.minCount); // 滑动slider, 也跟着变，就对了！
            const chart_shots = shots().shotRenderThreshold(this.props.minCount).displayToolTips(true).displayType("hexbin"); // change input here
            courtSelection.call(chart_court);
            courtSelection.datum(final_shots).call(chart_shots);
        });
    }
    render() {
        return (
            <div id="shot-chart"></div>
        );
    }
}



