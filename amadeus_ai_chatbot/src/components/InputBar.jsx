import "../styles/InputBar.css";
import { SendInput } from "../assets/svg/svg.jsx";

export default function InputBar({ setMessages }) {
  async function SendMessage() {
    const msg = document.getElementById("search-bar-input");
    setMessages((prev) => [
      ...prev,
      {
        role: "sender",
        message: msg.value,
      },
    ]);

    const userMsg = msg.value;

    clearInputBar();

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
        // "X-OpenRouter-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: userMsg,
          },
        ],
      }),
      max_tokens: 256,
    });

    if (!resp.ok) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          message: data.error.message,
        },
      ]);
      return;
    }

    const data = await resp.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "receiver",
        message: data.choices[0].message.content,
      },
    ]);
  }

  function clearInputBar() {
    const msg = document.getElementById("search-bar-input");
    msg.value = "";
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
