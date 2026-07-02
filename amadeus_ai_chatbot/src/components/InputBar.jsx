import "../styles/InputBar.css";
import { SendInput, NewChat as AddItem } from "../assets/svg/svg.jsx";
import { useLayoutEffect, useRef, useState } from "react";

export default function InputBar({ messages, setMessages }) {
  const inputInitial = useRef();
  const [expanded, setExpanded] = useState(false);

  // streaming flag
  const [isStreaming, setStreaming] = useState(false);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      const input = inputInitial.current;

      setExpanded(input.scrollHeight > 34);
    });

    observer.observe(inputInitial.current);

    return () => observer.disconnect();
  }, []);

  async function SendMessage() {
    console.log("pressed");

    setStreaming(true);

    const editableDiv = document.getElementById("search-bar-input");
    const msg = editableDiv.innerText;
    const userMsg = msg.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: userMsg,
      },
    ]);

    clearInputBar();

    let context = "CURRENT CONTEXT: ";
    for (const message of messages) {
      context += `\n ${message.role}: ${message.message}`;
    }
    console.log(context);

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
            content: `${context} \n ${userMsg}`,
          },
        ],
        stream: true,
      }),
    });

    if (!resp.ok) {
      // throw new Error(`HTTP Error: ${resp.status}`);
      setMessages((prev) => {
        return [
          ...prev,
          {
            role: "error",
            message: `HTTP Error: ${resp.status}`,
          },
        ];
      });
    }

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

                if (lastMessage && lastMessage.role === "chatbot") {
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
                    role: "chatbot",
                    message: content,
                  },
                ];
              });
            }
          } catch (error) {
            setMessages((prev) => {
              return [
                ...prev,
                {
                  role: "error",
                  message: error.message,
                },
              ];
            });
          } finally {
            setStreaming(false);
          }
        }
      }
    }
  }

  function clearInputBar() {
    const msg = document.getElementById("search-bar-input");
    msg.innerText = "";
  }

  return (
    <div className={`searchbar_wrapper ${expanded ? "expanded" : ""}`}>
      <div className="searchbar-input-wrapper">
        <button className="add-item-btn">
          <AddItem className="add-btn"></AddItem>
        </button>
        <div
          ref={inputInitial}
          contentEditable="true"
          id="search-bar-input"
          className="search_input"
          type="text"
          inputMode="text"
        ></div>
        <button className="input-bar-btn" onClick={SendMessage}>
          <SendInput className="input_btn" />
        </button>
      </div>
    </div>
  );
}
