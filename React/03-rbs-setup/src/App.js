import React, { useCallback, useState } from "react";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./demo/DemoOutput";
import "./App.css";

function App() {
  const [togglePara, setTogglePara] = useState(false);
  const [enableToggling, setEnableToggling] = useState(false);

  const toggleParaHandler = useCallback(() => {
    if (enableToggling) {
      setTogglePara((e) => !e);
    }
  }, [enableToggling]);

  const enableTogglingHandler = () => {
    setEnableToggling(true);
  };

  return (
    <div>
      <div className="app">
        <h1>Hi there!</h1>
        <Button onClick={enableTogglingHandler}>Enable Toggling</Button>
        <Button onClick={toggleParaHandler}>Toggle Para</Button>
        <DemoOutput show={togglePara} />
      </div>
    </div>
  );
}

export default App;
