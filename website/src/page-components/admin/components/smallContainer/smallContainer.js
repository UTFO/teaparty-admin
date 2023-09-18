import "./smallContainer.css";

export default function SmallContainer(props) {
  return (
    <div style={{ width: `${props.width}%` }} className="admin-small-container">
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
      <div style={{ paddingBottom: 40 }}></div>
      {props.children}
    </div>
  );
}
