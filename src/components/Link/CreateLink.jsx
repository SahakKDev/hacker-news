import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Input from "../Input";

const CREATE_LINK = gql`
  mutation CreateLink($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      description
      url
    }
  }
`;

export default function CreateLink() {
  const [formState, setFormState] = useState({ url: "", description: "" });
  const navigate = useNavigate();

  const [createLink] = useMutation(CREATE_LINK, {
    variables: {
      url: formState.url,
      description: formState.description,
    },
    onCompleted: () => navigate("/"),
  });

  const onInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        createLink();
      }}
    >
      <div className="form-item">
        <Input
          label="Url"
          tagName="input"
          type="text"
          id="url"
          name="url"
          onChange={(e) => onInputChange("url", e.target.value)}
        />
      </div>

      <div className="form-item">
        <Input
          label="Description"
          tagName="textarea"
          id="description"
          name="description"
          onChange={(e) => onInputChange("description", e.target.value)}
        />
      </div>

      <button type="submit" className="button">
        Create Link
      </button>
    </form>
  );
}
