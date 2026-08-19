import React from "react";

import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
