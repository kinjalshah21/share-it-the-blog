import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import { logIn,logOut } from "./store/authSlice"
import authService from "./appwrite/auth"
import { Header,Footer } from "./components"
import { Outlet } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUserLoginStatus()
    .then((userData) => {
      if(userData){
        dispatch(logIn({userData}))
      }
      else{
        dispatch(logOut())
      }
    })
    .finally(() => setLoading(false))
  })

 return !loading ? (
  <div className=" min-h-screen flex flex-wrap content-between bg-[#F7F7FF]">
  <div className="w-full block">
   <Header/>
   <main>
    <Outlet/>
   </main>
   <Footer/>
  </div>
  </div>
 ) : (null)
}

export default App
