import { useState } from "react";
import InputBar from "./components/InputBar";
import PageHeader from "./components/PageHeader";
import SideBar from "./components/SideBar";
import ContentPane from "./components/ContentPane";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-body">
      <SideBar title={"#"} />

      <ContentPane header={<PageHeader title={"amadeus"}></PageHeader>}>
        <InputBar />
      </ContentPane>
    </div>
  );
}

export default App;
