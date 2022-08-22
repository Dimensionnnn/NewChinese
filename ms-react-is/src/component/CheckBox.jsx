import { Hidden } from '@mui/material';
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
          <input type="radio" name="" value="1" checked={this.state.sex==="1"} onClick={(e)=>this.getValue(e)}/><label htmlFor="woman">私有</label>
        </div>
      );
  }
  
  getValue=(event)=>{
    if(this.state.sex === "0"){
      this.setState({
        sex:"1"
      })
      this.props.handlePublic("1")
    }
    else if(this.state.sex === "1"){
      this.setState({
        sex:"0"
      })
      this.props.handlePublic("0")
    }
    //获取单选框选中的值
    console.log(this.state.sex);

  }
}
 
export default CheckBox;