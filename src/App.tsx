import { Routes,Route } from "react-router-dom"
import { Dashboard, CreateContact, UpdateContact, ViewContacts } from "./Components/Contact"
export  function App() {
  return (
 <Routes>

  <Route path="/" element={<CreateContact/>}/>
  <Route path="/viewcontacts" element={<ViewContacts/>}/>
      <Route path="/update/:id" element={<UpdateContact/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
  
   </Routes>
  )
}
export default App
