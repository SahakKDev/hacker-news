import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { isAuthenticated } from "./helpers.js";
import App from "./components/App.jsx";
import "./index.css";

const link = new HttpLink({
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

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
