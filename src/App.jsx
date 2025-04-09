import styles from "./App.module.css";
import Counter from "./components/Counter/Counter";
import Input from "./components/Input/Input";

function App() {
  return (
    <div className={styles.rootContainer}>
      {/* <Counter /> */}
      <Input
        placeHolder="Enter firstname"
        label="First name"
        errorMessage="First name is required"
      ></Input>
    </div>
  );
}

export default App;
