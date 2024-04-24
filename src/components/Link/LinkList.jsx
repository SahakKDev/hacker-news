import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Link from "./Link";
import { LINKS_PER_PAGE } from "../../constants";
import { getLinksToRender, getQueryVariables } from "../../helpers";

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
  query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
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
  const location = useLocation();
  const navigate = useNavigate();
  const isNewPage = location.pathname.includes("new");
  const pageIndexParams = location.pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const { data, error, loading, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page),
    fetchPolicy: "network-only",
  });

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
      {getLinksToRender(isNewPage, data).map((link, index) => {
        return <Link key={link.id} link={link} index={index + pageIndex} />;
      })}

      {isNewPage && (
        <div>
          <button
            className="button"
            onClick={() => {
              if (page > 1) {
                navigate(`/new/${page - 1}`);
              }
            }}
          >
            Previous
          </button>
          <button
            className="button"
            onClick={() => {
              if (page <= data.feed.count / LINKS_PER_PAGE) {
                const nextPage = page + 1;
                navigate(`/new/${nextPage}`);
              }
            }}
          >
            Next
          </button>
        </div>
      )}
    </ul>
  );
}
