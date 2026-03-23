import { Component } from "react";
import { T } from "../config/tokens";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            background: T.bg,
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem"
          }}
        >
          <div style={{ fontSize: "2.5rem" }}>⚠️</div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: "1.2rem",
              color: T.black,
              textAlign: "center"
            }}
          >
            Something went wrong
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: T.muted,
              textAlign: "center",
              maxWidth: "400px"
            }}
          >
            {this.state.error?.message || "An unexpected error occurred. Please refresh the page."}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.7rem 1.5rem",
              background: T.black,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
