import "../styles/InputBar.css";
import { SendInput } from "../assets/svg/svg.jsx";

export default function InputBar({ setMessages }) {

  function SendMessage() {
    const msg = document.getElementById("search-bar-input");
    setMessages((prev) => [
      ...prev,
      {
        role: "sender",
        message: msg.value,
      },
    ]);

    clearInputBar()
  }

  function clearInputBar() {
    const msg = document.getElementById("search-bar-input");
    msg.value = ""
  }

  return (
    <div className="searchbar_wrapper">
      <input
        id="search-bar-input"
        className="search_input"
        type="text"
        size={65}
        placeholder="Ask me Anything!"
      />
      <button className="input-bar-btn" onClick={SendMessage}>
        <SendInput className="input_btn" />
      </button>
    </div>
  );
}
