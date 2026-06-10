import "../styles/PageHeader.css";

export default function PageHeader({ title, children }) {
  return (
    <div className="page_header">
      <div className="header-title">{title}</div>
      <div className="header-children">{children}</div>
    </div>
  );
}
