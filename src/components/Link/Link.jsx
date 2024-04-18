export default function Link({ link, index }) {
  return (
    <li>
      {index}. {link.description} ({link.url})
    </li>
  );
}
