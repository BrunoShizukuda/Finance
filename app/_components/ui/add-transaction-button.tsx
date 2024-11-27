"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import {  Tooltip ,TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}


const AddTransactionButton = ({userCanAddTransaction}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full font-bold"
            onClick={() => setDialogIsOpen(true)}
            disabled={!userCanAddTransaction}
          >
            Adicionar transações
            <ArrowDownUpIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {!userCanAddTransaction && "Você atingiu o limite de transações. Atualize para o plano premium para ter acesso ilimitado"}
        </TooltipContent>
      </Tooltip>
      </TooltipProvider>
    
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
