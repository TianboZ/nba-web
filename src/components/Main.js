import React from 'react';
import {ShotChart} from "./ShotChart";
import nba from 'nba';
import {Profile} from "./Profile";

export class Main extends React.Component {
    state = {
        playerId : nba.findPlayer('Stephen Curry').playerId
    }
    render() {
        return (
            <div className='main'>
                <Profile />
                <ShotChart playerId={this.state.playerId}/>
            </div>
        );
    }
}