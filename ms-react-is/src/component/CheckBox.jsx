import React, { Component } from 'react'
class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sex:"0" // 定义选中的值，如果为空字符串，则默认不选中
     }
  }
  render() { 
    return (
        <div>
          <input type="radio" name="" value="0" checked={this.state.sex===0} onChange={(e)=>this.getValue(e)}/><label htmlFor="man">公开</label>
          <input type="radio" name="" value="1" checked={this.state.sex===1} onChange={(e)=>this.getValue(e)}/><label htmlFor="woman">私有</label>
        </div>
      );
  }
  getValue=(event)=>{
    //获取单选框选中的值
    console.log(event.target.value);
    this.setState({
      sex:event.target.value
    })
    this.props.handlePublic(event.target.value)
  }
}
 
export default CheckBox;