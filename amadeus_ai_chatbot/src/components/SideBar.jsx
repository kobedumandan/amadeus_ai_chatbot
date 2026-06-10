import "../styles/SideBar.css";
import {
  Chats,
  More,
  MoreVertical,
  NewChat,
  SidebarToggle,
} from "../assets/svg/svg.jsx";

const SIDEBAR_LINKS = [
  { label: "New Chat", icon: <NewChat className="sidebar-link-icon" /> },
  { label: "Chats", icon: <Chats className="sidebar-link-icon" /> },
  { label: "More", icon: <More className="sidebar-link-icon" /> },
];

const RECENT_CHATS = [
  "How to Pet Cat",
  "Persoa 5 Royal Glitch",
  "How to start React Project",
];
export default function SideBar({ title, user }) {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <div>{title}</div>
        <div>
          <button id="sidebar-toggle">
            <SidebarToggle className="sidebar-icon" />
          </button>
        </div>
      </div>
      <div className="sidebar-links">
        <ul>
          {SIDEBAR_LINKS.map((links, index) => (
            <li key={index}>
              {links.icon}
              <a href="#">{links.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="recents-wrapper">
        <ul>
          {RECENT_CHATS.map((chats, index) => (
            <li key={index}>
              <div className="recents-label">{chats}</div>
              <button className="recents-action-btn">
                <MoreVertical className="recents-icon" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
