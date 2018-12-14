import React, { Component } from 'react'

export class LinkBlank extends Component {
	render() {
		return (
			<a
				href={this.props.url}
				title={this.props.title}
				style={this.props.style}
				className={this.props.class}
				target="_blank"
				rel="noopener noreferrer">
				{this.props.content}
			</a>
		)
	}
}

export default LinkBlank
