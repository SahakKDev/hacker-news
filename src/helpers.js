import { AUTH_TOKEN, LINKS_PER_PAGE } from "./constants";

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export function timeAgo(dateString) {
  // Convert the input date string to a Date object
  const postedTime = new Date(dateString);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - postedTime;

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  // Return the appropriate string based on the time difference
  if (timeDifference < minute) {
    return "just now";
  } else if (timeDifference < hour) {
    const minutes = Math.round(timeDifference / minute);
    return `${minutes} min ago`;
  } else if (timeDifference < day) {
    const hours = Math.round(timeDifference / hour);
    return `${hours} h ago`;
  } else if (timeDifference < month) {
    const days = Math.round(timeDifference / day);
    return `${days} days ago`;
  } else if (timeDifference < year) {
    const months = Math.round(timeDifference / month);
    return `${months} mo ago`;
  } else {
    const years = Math.round(timeDifference / year);
    return `${years} years ago`;
  }
}

export const getQueryVariables = (isNewPage, page) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 10;
  const orderBy = { createdAt: "desc" };
  return { take, skip, orderBy };
};

export const getLinksToRender = (isNewPage, data) => {
  if (isNewPage) {
    return data.feed.links;
  }
  const rankedLinks = data.feed.links.slice();
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
  return rankedLinks;
};
