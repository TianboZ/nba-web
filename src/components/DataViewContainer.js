import React from 'react';
import {ShotChart} from "./ShotChart";
import {CountSlider} from "./CountSlider"

export class DataViewContainer extends React.Component {
    // initial state
    state = {
        minCount : 5,
    }

    // function传下去， 这个function一旦被触发，re-render
    onCountSliderChange = (count) => {
        this.setState( { minCount : count } );
        console.log('DataViewContainer minCount=' + count); // if change, 就对了。问题是，当滑动slider时，这个count确实在变，可是没有发生re-render，why?
    }


    render() {
        return(

            // 现在有两个平行的component (ShortCount, ShotChart)，如何communication？ CountSlider 变化，如何影响ShotChart?
            // LCA！！！ e.g. parent: DataViewContainer children: ShotChart,  CountSlider
            // now, CountSlider changes, trigger DataViewContainer, then DataViewContainer re-render, children then change
            // 想让lca变，加一个state
            <div className='data-view'>
                <ShotChart playerId={this.props.playerId}   minCount={this.state.minCount}/>

                <div className='filters'>
                    <CountSlider onCountSliderChange={this.onCountSliderChange}/>
                </div>
            </div>
        );
    }
}