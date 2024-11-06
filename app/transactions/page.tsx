import { ArrowDownUpIcon } from 'lucide-react';
import {Button} from '../_components/ui/button'
import { db } from '../_lib/prisma';
import { DataTable } from '../_components/ui/data-table';
import { TransactionColumns } from './_columns';

const TransactionPage = async () => {
    const transactions = await db.transaction.findMany({});
    return (
        <div className='p-6 space-y-6'>
            {/* Titulo e Botão */}
            <div className='flex w-full justify-between items-center '>
                <h1 className='text-2xl font-bold'>Transações</h1>
                <Button className='rounded-full font-bold'>
                    Adicionar transações
                    <ArrowDownUpIcon/></Button>
            </div>
            <DataTable columns={TransactionColumns} data={transactions}/>
        </div>
    );
};

export default TransactionPage;
