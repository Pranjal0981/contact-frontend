import { Routes,Route } from "react-router-dom"
import { CreateContact } from "./Components/Contact"
export  function App() {
  return (
 <Routes>

  <Route path="/" element={<CreateContact/>}/>
 </Routes>
  )
}
export default App
