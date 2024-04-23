import { gql, useQuery } from "@apollo/client";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Link from "./Link";

export const FEED_QUERY = gql`
  {
    feed {
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

export default function LinkList() {
  const { data, error, loading } = useQuery(FEED_QUERY);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error>Something went wrong.</Error>;
  }

  return (
    <ul className="link-list">
      {data.feed.links.map((link, index) => (
        <Link key={link.id} link={link} index={index + 1} />
      ))}
    </ul>
  );
}
