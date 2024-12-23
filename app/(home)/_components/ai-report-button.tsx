"use client"

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAirReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown"

interface AirReportButtonProps {
    month: string;
    hasPremiumPlan: boolean;
}


const AirReportButton = ({month} : AirReportButtonProps) => {
     const [report, setReport] = useState<string | null>(null)
    const [reportIsLoading, setReportIsLoading] = useState(false)
    const handleGenerateReportClick = async () => {
        try {
            setReportIsLoading(true)
            const aiReport = await generateAirReport({month})
            setReport(aiReport)
        } catch(error){
            console.log(error)
        } finally {
            setReportIsLoading(false)
        }

    }
    return ( 
        <Dialog onOpenChange={(open) => {
            if(!open) {
                setReport(null)
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    Relátorio IA
                    <BotIcon/>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Relátorio IA</DialogTitle>
                    <DialogDescription>
                        Use inteligência artificial para gerar um relatório com insights sobre suas finanças.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="prose max-h-[450px] text-white prose-h3:textwhite prose-h4:text-white prose-strong:text-white">
                    <Markdown>{report}</Markdown>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                         <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleGenerateReportClick} disabled={reportIsLoading}>
                        {reportIsLoading && <Loader2Icon className="animate-spin"/>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
 
export default AirReportButton;