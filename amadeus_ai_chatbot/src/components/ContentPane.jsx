import "../styles/ContentPane.css";
import { Share, More } from "../assets/svg/svg.jsx";

export default function ContentPane({ header, inputBar, children }) {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        {header}
        <div className="header-button-group">
          <button className="header-button">
            <Share className="content-pane-icon" />
            Share
          </button>
          <button className="header-more">
            <More className="content-pane-icon" />
          </button>
        </div>  
      </div>
      <div className="content-body">
        {children}
      </div>
      <div className="input-bar-wrapper">{inputBar}</div>
    </div>
  );
}
