import { UserButton } from "@clerk/nextjs";
import {auth} from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import Navbar from "./_components/ui/nav-bar";

const Home = async () => {
  const {userId} = await auth();
  if (!userId) {
    redirect('/login')
  }
  return <Navbar/>
   
  
}

export default Home