import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { isAuthenticated } from "./helpers.js";
import App from "./components/App.jsx";
import "./index.css";
import { AUTH_TOKEN } from "./constants.js";

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
});
const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  const token = isAuthenticated();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
