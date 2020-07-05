import React from "react";
import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from "./error-boundary.container";

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false,
        };
    }

    static getDerivedStateFromError(error) {
        // process error
        return {hasErrored: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
    }

    render() {
        return this.state.hasErrored ?
            <ErrorImageOverlay>
                <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png'/>
                <ErrorImageText>
                    Sorry this page is broken
                </ErrorImageText>
            </ErrorImageOverlay>
            : this.props.children;
    }
}

export default ErrorBoundary;