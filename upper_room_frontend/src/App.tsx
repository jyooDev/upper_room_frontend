import AppRouter from "./routes/index";

// import { useAuthListener, useAuthHandlers } from "./hooks";
import { AuthContextProvider } from "./contexts";

function App() {
  return (
    <div>
      {/* browerser router here */}
      <AuthContextProvider>
        {/* redux provider to be insude of context */}
        <AppRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
