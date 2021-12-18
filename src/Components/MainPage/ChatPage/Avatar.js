import React, { Component } from "react";
import "./ChatPage.css"

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src= {this.props.image} alt="#" />
        </div>
      </div>
    );
  }
  
}