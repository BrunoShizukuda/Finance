import { auth } from "@clerk/nextjs/server"
import Navbar from "../_components/ui/nav-bar"
import { redirect } from "next/navigation"

const Subscription = async() => {
    const {userId} = await auth()
  if(!userId) {
      redirect('/login')
  }
    return <Navbar/>
}

export default Subscription