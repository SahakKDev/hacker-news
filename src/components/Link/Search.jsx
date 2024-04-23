import { useState } from "react";
import Input from "../Input";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "./Link";

const FILTERED_QUERY = gql`
  query FilteredQuery($filter: String) {
    feed(filter: $filter) {
      id
      links {
        id
        description
        url
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
        }
      }
      count
    }
  }
`;

export default function Search() {
  const [search, setSearch] = useState("");
  const [handleSearch, { data, loading, error }] = useLazyQuery(
    FILTERED_QUERY,
    {
      variables: {
        filter: search,
      },
    }
  );

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <div className="search">
        <Input
          id="search"
          label="Search"
          value={search}
          onChange={handleChange}
        />
        <button className="button" onClick={handleSearch}>
          OK
        </button>
      </div>
      {data?.feed?.links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </>
  );
}
