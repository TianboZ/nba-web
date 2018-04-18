import { AutoComplete, Input, Icon} from 'antd';
import React from 'react';
import * as nba from "nba";



export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    onSelect = (name) => {
        this.props.handleSelectPlayer(name);
    }

    handleSearch = (value) => {
        // add data source, 才知道要补充什么
        // nba那里拿

        const players = nba.searchPlayers(value);
        console.log(players); // player is a object, take useful fields


        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(player => player.fullName)
        });
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className='search-bar'
                dataSource={dataSource}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
                size='large'
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}