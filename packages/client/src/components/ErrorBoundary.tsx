import React, { ErrorInfo } from "react";

class ErrorBoundary extends React.Component {
	state:Indexed = {}
	constructor(props:Indexed) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}
	
	componentDidCatch(error:Error, errorInfo:ErrorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			error: error,
			errorInfo: errorInfo
		})
		// You can also log error messages to an error reporting service here
	}
	
	render() {
	if (this.state.errorInfo) {
		return (
		<div>
			<h2>Something went wrong.</h2>
			<details style={{ whiteSpace: 'pre-wrap' }}>
				{this.state.error && this.state.error.toString()}
				<br/>
				{this.state.errorInfo.componentStack}
			</details>
		</div>
		);
	}
	// Normally, just render children
	return this.props['children' as keyof typeof this.props];
	}  
}

export default ErrorBoundary;
