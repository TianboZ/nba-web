import React from 'react';

import { Slider, InputNumber, Row, Col } from 'antd';

// ant design 照抄
export class CountSlider extends React.Component {
    // initial state
    state = {
        inputValue: 1,
    }
    // state 一变，re-render
    onChange = (value) => {
        console.log(value);
        this.setState({
            inputValue: value,
        });

        // 核心的一步！把value这个input返回给了parent component！从而引发parent component state 变化
        this.props.onCountSliderChange(value);
    }
    render() {
        return (
            <Row>
                <Col span={12} offset={4}>
                    <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={20}
                        style={{ marginLeft: 16 }}
                        value={this.state.inputValue}
                        onChange={this.onChange}
                    />
                </Col>
            </Row>
        );
    }
}