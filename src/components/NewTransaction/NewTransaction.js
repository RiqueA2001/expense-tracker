import { useContext, useRef, useState } from 'react'
import ExpenseTrackerContext from '../../store/expense-tracker-context'
import classes from './NewTransaction.module.css'

const isEmpty = value => value.trim() === ''
const hasOperator = (value, operator) => operator === '+' || operator === '-'

const NewTransaction = () => {
  const expenseTrackerCtx = useContext(ExpenseTrackerContext)

  const textInputRef = useRef()
  const amountInputRef = useRef()

  const [textError, setTextError] = useState(false)
  const [amountError, setAmountError] = useState(null)

  let isTextValid = true
  let isAmountValid = true

  const submitHandler = event => {
    event.preventDefault()

    const enteredText = textInputRef.current.value
    const enteredAmount = amountInputRef.current.value

    // check if text is empty
    if (isEmpty(enteredText)) {
      setTextError(true)
      isTextValid = false
    } else {
      setTextError(false)
      isTextValid = true
    }

    const operator = enteredAmount.trim().slice(0, 1)
    // check if amount is empty or if it doesn't include an operator
    if (isEmpty(enteredAmount)) {
      setAmountError('Amount is empty')
      isAmountValid = false
    } else if (!hasOperator(enteredAmount, operator)) {
      setAmountError('"+" or "-" must be included')
      isAmountValid = false
    } else {
      setAmountError(null)
      isAmountValid = true
    }

    if (!isTextValid || !isAmountValid) {
      return
    }

    // create new expense
    const newTransaction = {
      id: Math.random(),
      text: enteredText,
      amount: enteredAmount
    }

    // add expense to the list
    expenseTrackerCtx.addTransaction(newTransaction)

    const sendData = async () => {
      // send new expense to database
      await fetch(
        'https://react-http-77849-default-rtdb.firebaseio.com/expenses.json',
        {
          method: 'POST',
          body: JSON.stringify(newTransaction)
        }
      )
    }
    sendData()

    textInputRef.current.value = ''
    amountInputRef.current.value = ''
  }

  const textInputClasses = `${classes.control} ${
    !textError ? '' : classes.invalid
  }`

  const amountInputClasses = `${classes.control} ${
    !amountError ? '' : classes.invalid
  }`

  return (
    <form onSubmit={submitHandler} className={classes['new-transaction']}>
      <h3>Add new transaction</h3>
      <div className={textInputClasses}>
        <label htmlFor="text">Text</label>
        <input
          ref={textInputRef}
          id="text"
          type="text"
          placeholder="Enter text..."
        />
        {textError && <p className={classes['error-text']}>Text is empty</p>}
      </div>
      <div className={amountInputClasses}>
        <label htmlFor="amount">
          Amount(negative - expense, positive - income)
        </label>
        <input
          ref={amountInputRef}
          id="amount"
          type="text"
          placeholder="Enter amount..."
        />
        {amountError && <p className={classes['error-text']}>{amountError}</p>}
      </div>
      <button>Add transaction</button>
    </form>
  )
}

export default NewTransaction
