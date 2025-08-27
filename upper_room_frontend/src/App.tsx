import { Provider } from "react-redux";

import { AuthContextProvider } from "./contexts";
import AppRouter from "./routes/index";
import { store } from "./store/store";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
