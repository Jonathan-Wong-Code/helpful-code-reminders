import React, { Component, Fragment } from "react";
import { node, object } from "prop-types";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import ErrorBody from "../../components/errorBody";

import withAnalytics from "../analyticsHoc";
import { selectBrowseCatalog } from "../contentfulHoc/selectors";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorInfo: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;

    const {
      browseCatalog: {
        error: { errorBoundary },
      },
    } = this.props;

    const { maintenance } = errorBoundary;
    if (error) {
      return (
        <Fragment>
          <ErrorBody maintenance={maintenance} />
          {process.env.NODE_ENV === "development" && (
            <p style={{ whiteSpace: "pre-wrap" }}>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </p>
          )}
        </Fragment>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: node.isRequired,
  maintenance: object,
  browseCatalog: object.isRequired,
};

ErrorBoundary.defaultProps = {
  maintenance: {
    textBlock: {
      data: {},
      content: [],
      nodeType: "document",
    },
    image: null,
    textBlockBackground: "white",
  },
};

export const mapStateToProps = createStructuredSelector({
  browseCatalog: selectBrowseCatalog(),
});

export default connect(mapStateToProps)(withAnalytics(ErrorBoundary));
