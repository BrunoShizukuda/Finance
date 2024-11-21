import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { TransactionColumns } from "./_columns";
import AddTransactionButton from "../_components/ui/add-transaction-button";
import Navbar from "../_components/ui/nav-bar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const TransactionPage = async () => {
  const {userId} = await auth()
  if(!userId) {
      redirect('/login')
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    }
  });
  
  return (
    <>
    <Navbar/>
      <div className="space-y-6 p-6 overflow-hidden">
      {/* Titulo e Botão */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <ScrollArea>
        <DataTable columns={TransactionColumns} data={transactions} />
      </ScrollArea>
    </div>
    </>
  );
};

export default TransactionPage;
