import { auth, clerkClient } from "@clerk/nextjs/server"
import Navbar from "../_components/ui/nav-bar"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader } from "../_components/ui/card"
import { CheckIcon, XIcon } from "lucide-react"
import AcquirePlanButton from "./_components/acquire-plan-button"
import { Badge } from "../_components/ui/badge"

const Subscription = async() => {
    const {userId} = await auth()
  if(!userId) {
      redirect('/login')
  }

   const user = await clerkClient().users.getUser(userId) 
   const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium"
 
    return <>
    <Navbar/>
    <div className="p-6 space-y-6">
      <h1 className="font-bold text-2xl">Assinatura</h1>

      <div className="flex gap-6">
        <Card className="w-[450px]">
          <CardHeader className="border-b border-solid py-8">
            <h2 className="font-semibold text-2xl text-center">
              Plano Básico
            </h2>
            <div className="flex items-center gap-3 justify-center">
              <span className="text-4xl">R$</span>
              <span className="font-semibold text-6xl">0</span>
              <div className="text-muted-foreground text-2xl">/mês</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <div className="flex flex-center gap-2">
              <CheckIcon className="text-primary"/>
              <p>Apenas 10 transações por mês (7/10)</p>
            </div>

            <div className="flex flex-center gap-2">
              <XIcon/>
              <p>Relatório de IA</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[450px]">
          <CardHeader className="border-b border-solid py-8 relative">
           {hasPremiumPlan && (
             <Badge className="absolute top-12 left-4 bg-primary/10 text-primary">Ativo</Badge>
           )} 
            <h2 className="font-semibold text-2xl text-center">
              Plano Premium
            </h2>
            <div className="flex items-center gap-3 justify-center">
              <span className="text-4xl">R$</span>
              <span className="font-semibold text-6xl">19</span>
              <div className="text-muted-foreground text-2xl">/mês</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <div className="flex flex-center gap-2">
              <CheckIcon className="text-primary"/>
              <p>Transações Ilimitadas</p>
            </div>

            <div className="flex flex-center gap-2">
              <CheckIcon className="text-primary"/>
              <p>Relatório de IA</p>
            </div>
            <AcquirePlanButton/>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
}

export default Subscription