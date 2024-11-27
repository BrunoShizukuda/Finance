
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/ui/nav-bar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transaction-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransaction from "./_components/last-transaction";
import { canUserAddTransaction } from "../_data/get-dashboard/can-user-add-transaction";
import AirReportButton from "./_components/ai-report-button";





const Home = async ({
  searchParams: { month },
}: {
  searchParams: { month: string };
}) => {
  const { userId } = await auth();
  if (!userId) {
    redirect('/login');
  }  

  const monthIsInvalid = !month || !isMatch(month, "MM")
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`)
  }
  const dashboard = await getDashboard(month)
  const userCanAddTransaction = await canUserAddTransaction()
  const user = await clerkClient().users.getUser(userId)
  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6 flex flex-col overflow-hidden ">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AirReportButton month={month} hasPremiumPlan={user.publicMetadata.subscriptionPlan === "premium"}/>
            <TimeSelect />
          </div>
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
           <div className="flex flex-col gap-6 overflow-hidden">
              <SummaryCards month={month} {...dashboard} userCanAddTransaction={userCanAddTransaction}/>
          
                <div className="grid grid-cols-3 grid-row-1 gap-6">
                  <TransactionsPieChart {...dashboard}/>
                  <ExpensesPerCategory expensesPerCategory={dashboard.totalExpensePerCategory}/>
                </div>
           </div>
           <LastTransaction lastTransactions={dashboard.lastTransactions}/>
        </div>
          
      </div>
    </>
  );
};



export default Home;
