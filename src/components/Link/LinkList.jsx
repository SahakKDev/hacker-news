import { gql, useQuery } from "@apollo/client";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Link from "./Link";

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
      }
    }
  }
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
        }
      }
    }
  }
`;

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
  const { data, error, loading, subscribeToMore } = useQuery(FEED_QUERY);

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newLink = subscriptionData.data.newLink;
      const prevLinks = prev.feed.links;

      const exists = prevLinks.find((link) => link.id === newLink.id);

      if (exists) return prev;

      return {
        feed: {
          ...prev.feed,
          links: prevLinks.concat(newLink),
          count: prev.feed.count + 1,
        },
      };
    },
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error>{error?.message}</Error>;
  }

  return (
    <ul className="link-list">
      {data.feed.links.map((link, index) => (
        <Link key={link.id} link={link} index={index + 1} />
      ))}
    </ul>
  );
}
