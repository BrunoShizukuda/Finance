import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { TransactionColumns } from "./_columns";
import AddTransactionButton from "../_components/ui/add-transaction-button";
import Navbar from "../_components/ui/nav-bar";

const TransactionPage = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <>
    <Navbar/>
      <div className="space-y-6 p-6">
      {/* Titulo e Botão */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={TransactionColumns} data={transactions} />
    </div>
    </>
  );
};

export default TransactionPage;
