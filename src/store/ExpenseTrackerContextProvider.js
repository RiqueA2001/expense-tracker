import { useEffect, useReducer } from 'react'
import ExpenseTrackerContext from './expense-tracker-context'

const defaultState = {
  expenseList: [],
  totalBalance: 0,
  income: 0,
  expense: 0
}

const getOperator = expenseAmount => {
  return expenseAmount.trim().slice(0, 1)
}

const getAmountNumber = expenseAmount => {
  return +expenseAmount.trim().slice(1)
}

const reducer = (state, action) => {
  if (action.type === 'FETCH') {
    const updatedExpenseList = [...action.loadedExpenses]
    const updatedTotal = updatedExpenseList.reduce((total, expense) => {
      const operator = getOperator(expense.amount)
      const amountNumber = getAmountNumber(expense.amount)
      if (operator === '+') {
        return total + amountNumber
      } else {
        return total - amountNumber
      }
    }, 0)
    const updatedIncome = updatedExpenseList.reduce((total, expense) => {
      const operator = getOperator(expense.amount)
      const amountNumber = getAmountNumber(expense.amount)
      if (operator === '+') {
        return total + amountNumber
      } else {
        return total
      }
    }, 0)
    const updatedExpense = updatedExpenseList.reduce((total, expense) => {
      const operator = getOperator(expense.amount)
      const amountNumber = getAmountNumber(expense.amount)
      if (operator === '-') {
        return total + amountNumber
      } else {
        return total
      }
    }, 0)
    return {
      expenseList: updatedExpenseList,
      totalBalance: updatedTotal,
      income: updatedIncome,
      expense: updatedExpense
    }
  }
  if (action.type === 'ADD') {
    const updatedList = state.expenseList.concat(action.transaction)

    const operator = getOperator(action.transaction.amount)
    const amountNumber = getAmountNumber(action.transaction.amount)

    let updatedIncome = state.income
    let updatedExpense = state.expense
    let updatedTotal = state.totalBalance

    if (operator === '+') {
      updatedIncome = state.income + amountNumber
      updatedTotal = state.totalBalance + amountNumber
    } else {
      updatedExpense = state.expense + amountNumber
      updatedTotal = state.totalBalance - amountNumber
    }
    return {
      expenseList: updatedList,
      totalBalance: updatedTotal,
      income: updatedIncome,
      expense: updatedExpense
    }
  }
  return defaultState
}

const ExpenseTrackerContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    // get expenses from database
    const fetchData = async () => {
      const result = await fetch(
        'https://react-http-77849-default-rtdb.firebaseio.com/expenses.json'
      )
      const resultData = await result.json()

      const loadedExpenses = []
      for (const key in resultData) {
        loadedExpenses.push({
          id: key,
          text: resultData[key].text,
          amount: resultData[key].amount
        })
      }
      dispatch({ type: 'FETCH', loadedExpenses })
    }
    fetchData()
  }, [])

  const addTransactionHandler = transaction => {
    dispatch({ type: 'ADD', transaction })
  }

  return (
    <ExpenseTrackerContext.Provider
      value={{
        expenseList: state.expenseList,
        totalBalance: state.totalBalance,
        income: state.income,
        expense: state.expense,
        addTransaction: addTransactionHandler
      }}
    >
      {props.children}
    </ExpenseTrackerContext.Provider>
  )
}

export default ExpenseTrackerContextProvider
