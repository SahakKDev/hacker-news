// import ArrowUp from "../ArrowUp";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { gql, useMutation } from "@apollo/client";

import { isAuthenticated, timeAgo } from "../../helpers";

const VOTE_MUTATION = gql`
  mutation Vote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
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
    }
  }
`;

export default function Link({ link, index }) {
  const isLoggedIn = isAuthenticated();
  const votesCount = link.votes.length;
  const author = link.postedBy?.name || "Unknown";

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
  });

  return (
    <li className="link mb-1">
      <div className="row">
        <span>{index + 1}.</span>
        {isLoggedIn && (
          <button className="btn-icon">
            <ArrowUpIcon onClick={vote} />
          </button>
        )}
        {link.description} ({link.url})
      </div>
      <div className="row ml-1">
        <span className="bold">{votesCount}</span> votes | by{" "}
        <span className="bold">{author}</span>
        <span>{timeAgo(link.createdAt)}</span>
      </div>
    </li>
  );
}
