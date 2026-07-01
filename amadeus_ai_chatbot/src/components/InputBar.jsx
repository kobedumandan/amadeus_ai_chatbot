import "../styles/InputBar.css";
import { SendInput } from "../assets/svg/svg.jsx";
import { useState } from "react";

export default function InputBar({ setMessages }) {

  // streaming flag
  const [isStreaming, setStreaming] = useState(false);

  async function SendMessage() {

    console.log("pressed")

    setStreaming(true);

    const msg = document.getElementById("search-bar-input");
    const userMsg = msg.value.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "sender",
        message: userMsg,
      },
    ]);

    clearInputBar();

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
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
        stream: true,
      }),
    });

    if (!resp.ok) {
      throw new Error(`HTTP Error: ${resp.status}`);
    }

    // const data = await resp.json();

    const reader = resp.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      const lines = chunk.split("\n");

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === "data: [DONE]") continue;

        if (trimmed.startsWith("data: ")) {
          try {
            const jsonStr = trimmed.replace("data: ", "");
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];

                if (lastMessage && lastMessage.role === "receiver") {
                  return [
                    ...prev.slice(0, -1),
                    {
                      ...lastMessage,
                      message: lastMessage.message + content,
                    },
                  ];
                }

                return [
                  ...prev,
                  {
                    role: "receiver",
                    message: content,
                  },
                ];
              });
            }
          } catch (error) {
            // setMessages((prev) => {
            //   return [...prev, {
            //     role: "error",
            //     message: error.message,
            //   }];
            // });
            console.log(error.message);
          }
          finally {
            setStreaming(false)
          }
        }
      }
    }
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
        placeholder="Ask me Anything!"
      />
      <button className="input-bar-btn" onClick={SendMessage}>
        <SendInput className="input_btn" />
      </button>
    </div>
  );
}
