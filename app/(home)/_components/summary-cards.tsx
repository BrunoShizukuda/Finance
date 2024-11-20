
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCard {
    month: string;
    balance: number;
    depositsTotal: number;
    investimentsTotal: number;
    expensesTotal: number;
}

const SummaryCards = async ({balance, depositsTotal, investimentsTotal, expensesTotal} : SummaryCard) => {
    
    return ( <div className="space-y-6">
        {/* Primeiro Card*/}
        
        <SummaryCard icon={<WalletIcon size={16}/>} title="Saldo" amount={balance} size="large"/>

        {/* Outros cards*/}
        <div className="grid grid-cols-3 gap-5">
            <SummaryCard
            icon={ <PiggyBankIcon size={16}/>} 
            title= "Investido"
            amount={investimentsTotal}/>


            <SummaryCard
            icon={ <TrendingUpIcon size={16} className="text-primary"/>} 
            title= "Receita"
            amount={depositsTotal}/>
            
            <SummaryCard
            icon={ <TrendingDownIcon size={16} className="text-red-500"/>} 
            title= "Despesas"
            amount={expensesTotal}/>
        </div>
    </div> );
}
 
export default SummaryCards;