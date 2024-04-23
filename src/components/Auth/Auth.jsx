import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { AUTH_TOKEN } from "../../constants";
import Input from "../Input";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";

const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function Auth() {
  const navigate = useNavigate();
  const [loginPage, setLoginPage] = useState(true);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signup, { error: signupError, loading: signupLoading }] = useMutation(
    SIGN_UP,
    {
      variables: {
        name: formState.name,
        email: formState.email,
        password: formState.password,
      },
      onCompleted: ({ signup }) => {
        localStorage.setItem(AUTH_TOKEN, signup.token);
        navigate("/");
      },
    }
  );

  const [login, { error: loginError, loading: loginLoading }] = useMutation(
    SIGN_IN,
    {
      variables: {
        email: formState.email,
        password: formState.password,
      },
      onCompleted: ({ login }) => {
        localStorage.setItem(AUTH_TOKEN, login.token);
        navigate("/");
      },
    }
  );

  const onInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginPage && login();
    !loginPage && signup();
  };

  const isLoading = loginLoading || signupLoading;

  const errorMessage =
    (loginError && loginError.message) || (signupError && signupError.message);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && errorMessage && <Error>{errorMessage}</Error>}
      <div>
        <h2 className="mb-2">{loginPage ? "Login" : "Sign up"}</h2>

        <form onSubmit={handleSubmit}>
          {!loginPage && (
            <div className="mb-1">
              <Input
                type="text"
                placeholder="Your name"
                onChange={(e) => onInputChange("name", e.target.value)}
              />
            </div>
          )}

          <div className="mb-1">
            <Input
              type="email"
              placeholder="Your email address"
              onChange={(e) => onInputChange("email", e.target.value)}
            />
          </div>

          <div className="mb-2">
            <Input
              type="password"
              placeholder="Your password"
              onChange={(e) => onInputChange("password", e.target.value)}
            />
          </div>

          <div className="auth-actions">
            <button disabled={isLoading} type="submit" className="button">
              {loginPage ? "Login" : "Create account"}
            </button>
            <button
              disabled={isLoading}
              type="button"
              className="button"
              onClick={() => setLoginPage((prev) => !prev)}
            >
              {loginPage
                ? "Need to create an account?"
                : "Already have an account?"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
