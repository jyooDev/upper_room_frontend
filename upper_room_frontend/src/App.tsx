import { Route, Routes } from "react-router"
import { Home } from "./pages/Home"
import { SignIn } from "./pages/SignIn"

function App() {
  return (
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<SignIn/>}/>
        </Routes>
      </div>
  )
}

export default App
