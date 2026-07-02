import { useState } from "react";
import InputBar from "./components/InputBar";
import PageHeader from "./components/PageHeader";
import SideBar from "./components/SideBar";
import ContentPane from "./components/ContentPane";
import "./App.css";

import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className="app-body">
      <SideBar title={"@"} />

      <ContentPane
        header={<PageHeader title={"amadeus"}></PageHeader>}
        inputBar={<InputBar messages={messages} setMessages={setMessages} />}
      >
        {messages.map((msg, index) => (
          <div className={`message_row ${msg.role}`}>
            <div className="chat_messages" key={index}>
              {msg.role === "chatbot" ? (
                <Markdown
                  components={{
                    // This isolates and styles the code blocks properly
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: "1.5rem 0",
                            padding: "1rem",
                            borderRadius: "12px",
                            fontSize: "0.9rem",
                            backgroundColor: "#1e1e1e", // Overrides theme background if needed
                            border: "1px solid #333",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            overflowX: "scroll",
                            width: "auto",
                          }}
                          codeTagProps={{
                            style: {
                              backgroundColor: "transparent", // Strips the inner background color
                              fontFamily: "inherit",
                              fontSize: "0.8125rem",
                            },
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.message}
                </Markdown>
              ) : (
                msg.message
              )}
            </div>
          </div>
        ))}
      </ContentPane>
    </div>
  );
}

export default App;
