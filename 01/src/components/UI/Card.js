import "./Card.css";

export default function Card(props) {
  const cssClasses = "card " + props.className;

  return <div className={cssClasses}>{props.children}</div>;
}
