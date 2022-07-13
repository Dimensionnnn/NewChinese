import React from 'react';
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }


    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <label > <input type="radio" name='gender' value="公有"
                    onChange={this.handleChange} />公有</label>
                <label > <input type="radio" name='gender' value="私有"
                    onChange={this.handleChange} />私有</label>
                <div>权限设置为: {this.state.value}</div>
            </div>
        )
    }
}
export default FlavorForm;
