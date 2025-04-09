import styles from "./App.module.css";
import Counter from "./components/Counter/Counter";
import Input from "./components/Input/Input";
import AccordionItem from "./components/AccordionItem/AccordionItem";
import Accordion from "./components/Accordion/Accordion";

function App() {
  return (
    <div className={styles.rootContainer}>
      {/* <Counter /> */}
      {/* <Input
        placeHolder="Enter firstname"
        label="First name"
        errorMessage="First name is required"
      ></Input> */}

      <Accordion></Accordion>
    </div>
  );
}

export default App;
