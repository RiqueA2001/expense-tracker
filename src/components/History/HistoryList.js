import { useContext } from 'react'
import ExpenseTrackerContext from '../../store/expense-tracker-context'
import HistoryItem from './HistoryItem'
import classes from './HistoryList.module.css'

const HistoryList = props => {
  const expenseTrackerCtx = useContext(ExpenseTrackerContext)

  return (
    <ul className={classes['history-list']}>
      {expenseTrackerCtx.expenseList.map(expense => {
        return (
          <HistoryItem
            key={expense.id}
            text={expense.text}
            amount={expense.amount}
          />
        )
      })}
    </ul>
  )
}

export default HistoryList
