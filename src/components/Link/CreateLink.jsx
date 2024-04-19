import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

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

  const [createLink] = useMutation(CREATE_LINK, {
    variables: {
      url: formState.url,
      description: formState.description,
    },
  });

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("create link");
        createLink();
      }}
    >
      <div className="form-item">
        <label htmlFor="url">Url</label>
        <input
          id="url"
          name="url"
          type="text"
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              url: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-item">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        ></textarea>
      </div>

      <button type="submit" className="button">
        Create Link
      </button>
    </form>
  );
}
