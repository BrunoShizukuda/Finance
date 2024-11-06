
import { db } from '../_lib/prisma';
import { DataTable } from '../_components/ui/data-table';
import { TransactionColumns } from './_columns';
import AddTransactionButton from '../_components/ui/add-transaction-button';

const TransactionPage = async () => {
    const transactions = await db.transaction.findMany({});
    return (
        <div className='p-6 space-y-6'>
            {/* Titulo e Botão */}
            <div className='flex w-full justify-between items-center '>
                <h1 className='text-2xl font-bold'>Transações</h1>
                <AddTransactionButton/>
            </div>
            <DataTable columns={TransactionColumns} data={transactions}/>
        </div>
    );
};

export default TransactionPage;
