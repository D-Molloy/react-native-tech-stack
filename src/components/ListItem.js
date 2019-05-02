import React, { Component } from "react";

import { CardSection } from "./common";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
  // added because the spring wasn't working on Android
  UIManager,
  Platform
} from "react-native";
import * as actions from "../actions";
import { connect } from "react-redux";

// added because the spring wasn't working on Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
class ListItem extends Component {
  // animations need to be called before the state is updated
  //any updates will be animated as long as we call LayoutAnimation before the update occurs
  componentWillUpdate() {
    //.spring was a bit too bouncy
    LayoutAnimation.easeInEaseOut();
  }
  renderDescription() {
    const { library, expanded } = this.props;
    if (expanded) {
      return (
        <CardSection>
          {/* flex is used so that the text wraps and fills up the Text tag - iOS only??*/}
          <Text style={{ flex: 1 }}>{library.description}</Text>
        </CardSection>
      );
    }
  }

  render() {
    const { selectLibrary } = this.props;
    const { id, title } = this.props.library;
    const { titleStyle } = styles;

    return (
      <TouchableWithoutFeedback onPress={() => selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

// ownProps are the props passed to the wrapped component(ListItem)
// ownProps === this.props in the component
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return {
    expanded
    // selectedLibraryId: state.selectedLibraryId
  };
};

// actions imports all of the action creators from actions/index and adds them to props
export default connect(
  mapStateToProps,
  actions
)(ListItem);
