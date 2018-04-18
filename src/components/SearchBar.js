import { AutoComplete, Input, Icon} from 'antd';
import React from 'react';

function onSelect(value) {
    console.log('onSelect', value);
}

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className='search-bar'
                dataSource={dataSource}
                onSelect={onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
                size='large'
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}