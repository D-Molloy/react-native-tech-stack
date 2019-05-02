import React from "react";
import { View } from "react-native";
import { Header } from "./components/common";
import LibraryList from "./components/LibraryList";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

const App = () => {
  return (
    // Provider can only have a single child
    <Provider store={createStore(reducers)}>
      {/* Tell the app to take up all the space */}
      <View style={{ flex: 1 }}>
        <Header headerText="Tech Stack" />
        <LibraryList />
      </View>
    </Provider>
  );
};

export default App;
