import "./App.css";
import Card from "./ui/Card";

import ConverterForm from "./components/ConverterForm";
import ConverterResult from "./components/ConverterResult";

const DUMMY_CURRENCIES = ["US", "CZK", "EUR"];

function App() {
  return (
    <div className="content">
      <Card>
        <ConverterForm currencies={DUMMY_CURRENCIES} />
        <ConverterResult />
      </Card>
    </div>
  );
}

export default App;
