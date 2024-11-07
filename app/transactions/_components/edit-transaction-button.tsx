"use client"

import { Button } from '@/app/_components/ui/button';
import UpsertTransactionDialog from '@/app/_components/ui/upsert-transaction-dialog';
import { Transaction } from '@prisma/client';
import {  PencilIcon } from 'lucide-react';
import { useState } from 'react';


interface EditTransactionButtonProps {
    transaction: Transaction
}

const EditTransactionButton = ({transaction}: EditTransactionButtonProps) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
       <Button 
       variant="ghost" 
       size="icon" 
       className="text-muted-foreground"
       onClick={() => setDialogIsOpen(true)} >
              <PencilIcon/>
          </Button>
      <UpsertTransactionDialog isOpen={dialogIsOpen} 
      setIsOpen={setDialogIsOpen}
      transactionId={transaction.id}
      defaultValues={{
        ...transaction,
        amount: Number(transaction.amount)
      }}/>

      
    </>
  );
};

export default EditTransactionButton;