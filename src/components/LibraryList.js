import React, { Component } from "react";
import ListItem from "./ListItem";

import { FlatList } from "react-native";
import { connect } from "react-redux";

class LibraryList extends Component {
  renderItem = ({ item }) => {
    return <ListItem library={item} />;
  };

  render() {
    const { libraries } = this.props;
    return (
      <FlatList
        data={libraries}
        renderItem={this.renderItem}
        keyExtractor={library => library.id}
      />
    );
  }
}

const mapStateToProps = state => ({
  libraries: state.libraries
});

export default connect(mapStateToProps)(LibraryList);
