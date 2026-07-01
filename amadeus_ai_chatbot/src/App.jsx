import { useState } from "react";
import InputBar from "./components/InputBar";
import PageHeader from "./components/PageHeader";
import SideBar from "./components/SideBar";
import ContentPane from "./components/ContentPane";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { role: "receiver", message: "Hello!" },
  ]);

  return (
    <div className="app-body">
      <SideBar title={"@"} />

      <ContentPane
        header={<PageHeader title={"amadeus"}></PageHeader>}
        inputBar={<InputBar setMessages={setMessages} />}
      >
        {messages.map((msg, index) => (
          <div className={`message_row ${msg.role}`}>
            <div className="chat_messages" key={index}>
              {msg.message}
            </div>
          </div>
        ))}
      </ContentPane>
    </div>
  );
}

export default App;
