import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { Provider } from "react-redux";
import { datadogRum } from "@datadog/browser-rum";
import { dataInit } from "./admin/utils/data-dog";

import "./index.css";
import App from "./App";
import reducers from "./combinedReducers";

const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducers, composeEnhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));

datadogRum.init(dataInit);
datadogRum.startSessionReplayRecording();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
