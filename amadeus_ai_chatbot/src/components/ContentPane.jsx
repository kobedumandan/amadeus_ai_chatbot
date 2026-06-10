import "../styles/ContentPane.css";

export default function ContentPane({ header, children }) {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        {header}
      </div>
      <div className="content-body">{children}</div>
    </div>
  );
}
