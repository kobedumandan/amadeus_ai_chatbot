import { useState } from "react";
import InputBar from "./components/InputBar";
import PageHeader from "./components/PageHeader";
import SideBar from "./components/SideBar";
import ContentPane from "./components/ContentPane";
import "./App.css";

var CHAT_MESSAGES = [
  { role: "sender", message: "Hello amadeus!" },
  { role: "reciever", message: "Hello kobe!" },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-body">
      <SideBar title={"@"} />

      <ContentPane header={<PageHeader title={"amadeus"}></PageHeader>}>
        {CHAT_MESSAGES.map((msg, index) => (
          <div className={`message_row ${msg.role}`}>
            <div className="chat_messages" key={index}>
              {msg.message}
            </div>
          </div>
        ))}
        <InputBar />
      </ContentPane>
    </div>
  );
}

export default App;
