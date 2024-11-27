"use server"

import { db } from "@/app/_lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"
import OpenAI from "openai"
import { generateAirReportSchema } from "./schema"

export const generateAirReport = async({month}: generateAirReportSchema) => {
    generateAirReportSchema.parse({month})
    const {userId} = await auth()
    if(!userId) {
        throw new Error("Unauthorized")
    }
    const user = await clerkClient().users.getUser(userId)
    const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium"
    if(!hasPremiumPlan) {
        throw new Error("you need a premium plan to generate IA reports")
    }
    const openAi = new OpenAI({
        apiKey: process.env.OPEN_API_KEY, 
    })
    const transactions = await db.transaction.findMany({
        where: {
            date: {
                gte: new Date(`2024-${month}-01`),
                lt: new Date(`2024-${month}-31`)
            }
        }
    })

    const content = `Gere um relatório com insights sobre as finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{VALOR}-{TIPO}-{CATEGORIA}. São elas:
    ${transactions
        .map(transaction => 
            `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`
        )
        .join(";")}`;
    const completion = await openAi.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: 'system',
                content:"você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas e organizarem melhor as suas finanças"
            },
            {
                role:"user",
                content,
            }
          
        ]
    })
    return completion.choices[0].message.content

} 