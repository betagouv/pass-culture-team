import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Button.css';

class Button extends Component {
	render() {
		// const color =  this.props.color && typeof this.props.color === 'string' && this.props.color.trim() || ''
		const color =  this.props.color;
		const buttonStyle = color ? { backgroundColor: color } : {};
		return (
			<button data-color={this.props.color} style={{ ...buttonStyle } } onClick={this.props.onClick}>
				<a href={this.props.link}>{this.props.content}</a>
			</button>
		);
	}
}

export default Button;
