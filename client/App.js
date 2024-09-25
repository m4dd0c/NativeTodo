import { Provider } from "react-redux";
import { Main } from "./src/Main";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";
export default function App() {
  return (
    <Provider store={store}>
      <Main />
      <Toast />
    </Provider>
  );
}
