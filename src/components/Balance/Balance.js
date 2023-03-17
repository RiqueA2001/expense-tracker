import { useContext } from 'react'
import ExpenseTrackerContext from '../../store/expense-tracker-context'
import classes from './Balance.module.css'

const Balance = props => {
  const expenseTrackerCtx = useContext(ExpenseTrackerContext)

  return (
    <div className={classes.balance}>
      <div className={classes['balance-total']}>
        <h3>YOUR BALANCE</h3>
        <span>{`$${expenseTrackerCtx.totalBalance}`}</span>
      </div>
      <div className={classes['income-expense']}>
        <div className={classes.income}>
          <h3>INCOME</h3>
          <span>{`$${expenseTrackerCtx.income}`}</span>
        </div>
        <div className={classes.expense}>
          <h3>EXPENSE</h3>
          <span>{`$${expenseTrackerCtx.expense}`}</span>
        </div>
      </div>
    </div>
  )
}

export default Balance
