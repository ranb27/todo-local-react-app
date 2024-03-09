import "./App.css";
import Todolist from "./components/Todolist";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

function App({ useSnackbar }) {
  return (
    <>
      <Todolist useSnackbar={useSnackbar} />
    </>
  );
}

export default App;
