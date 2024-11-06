import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgePrope {
    transaction: Transaction
}


const TransactionTypeBadge = ({transaction} : TransactionTypeBadgePrope) => {
        if (transaction.type === TransactionType.DEPOSIT) {
          return (
            <div className="inline-flex items-center bg-muted font-bold text-primary px-2 py-1 rounded-md hover:bg-muted">
              <CircleIcon className="mr-1 fill-primary text-green-500" size={6} />
              <span className="text-sm">Depósito</span>
            </div>
          );
        }
        if (transaction.type === TransactionType.EXPENSE) {
          return (
            <div className="inline-flex items-center bg-muted font-bold text-danger px-2 py-1 rounded-md hover:bg-muted">
              <CircleIcon className="mr-1 fill-danger" size={6} />
              <span className="text-sm">Despesa</span>
            </div>
          );
        }
        return (
          <div className="inline-flex items-center bg-muted font-bold text-white px-2 py-1 rounded-md hover:bg-muted">
            <CircleIcon className="mr-1 fill-white" size={6} />
            <span className="text-sm">Investimento</span>
          </div>
        );
          
         
 }
 

export default TransactionTypeBadge