import React from 'react';
import nba from 'nba';
import {Profile} from "./Profile";
import {DataViewContainer} from "./DataViewContainer";
import {SearchBar} from "./SearchBar";

export class Main extends React.Component {
    state = {
        playerId : nba.findPlayer('Stephen Curry').playerId,
        playerInfo: {},
    }

    componentDidMount() {
        nba.stats.playerInfo( {PlayerID : this.state.playerId} ).then((info) => {
            console.log(info);
            const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]); // object merge
            console.log(playInfo);

            this.setState({playerInfo: playInfo});
        })
    }
    render() {
        return (
            <div className='main'>
                <SearchBar />
                <div className='player'>
                    <Profile playerInfo={this.state.playerInfo}/>

                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>

            </div>
        );
    }
}