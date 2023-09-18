import "./container.css";

export default function Container(props) {
  return (
    <div className="admin-container">
      <p className="admin-container-p">{props.text}</p>
      <div style={{ width: "100%", margin: "0" }}>{props.children}</div>
    </div>
  );
}
