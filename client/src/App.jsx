import { RouterProvider } from "react-router-dom";
import router from "./router";
// import { createContext } from "react";
import { store } from "./store.js";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
