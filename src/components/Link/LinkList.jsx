import { gql, useQuery } from "@apollo/client";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Link from "./Link";

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        description
        url
      }
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

  console.log("data", data);

  return (
    <ul>
      {data.feed.links.map((link, index) => (
        <Link key={link.id} link={link} index={index + 1} />
      ))}
    </ul>
  );
}
