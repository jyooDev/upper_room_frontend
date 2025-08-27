import { Provider } from "react-redux";

import { AuthContextProvider } from "./contexts";
import AppRouter from "./routes/index";
import { store } from "./store/store";

function App() {
  return (
    <div>
      {/* browerser router here */}
      <AuthContextProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
