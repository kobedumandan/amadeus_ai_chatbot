import { useState } from "react";
import InputBar from "./components/InputBar";
import PageHeader from "./components/PageHeader";
import SideBar from "./components/SideBar";
import ContentPane from "./components/ContentPane";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { role: "sender", message: "Hello amadeus!" },
    { role: "reciever", message: "Hello kobe!" },
  ])

  return (
    <div className="app-body">
      <SideBar title={"@"} />

      <ContentPane header={<PageHeader title={"amadeus"}></PageHeader>}>
        {messages.map((msg, index) => (
          <div className={`message_row ${msg.role}`}>
            <div className="chat_messages" key={index}>
              {msg.message}
            </div>
          </div>
        ))}
        <InputBar setMessages={setMessages}/>
      </ContentPane>
    </div>
  );
}

export default App;
