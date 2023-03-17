import classes from './HistoryItem.module.css'

const HistoryItem = props => {
  const operator = props.amount.trim().slice(0, 1)

  // choose the expense color depending on the operator
  const expenseClasses =
    operator === '+'
      ? `${classes['history-item']} ${classes.income}`
      : `${classes['history-item']} ${classes.expense}`
  return (
    <li className={expenseClasses}>
      <h4>{props.text}</h4>
      <span>{props.amount}</span>
    </li>
  )
}

export default HistoryItem
