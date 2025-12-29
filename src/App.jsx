import { Outlet } from "react-router-dom"
import Appbar from "./Components/Appbar"

function App() {
  return (
    <>
      <Appbar />
      <Outlet />
    </>
  )
}

export default App
