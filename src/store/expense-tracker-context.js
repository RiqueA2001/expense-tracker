import React from 'react'

const ExpenseTrackerContext = React.createContext({
  expenseList: [],
  totalBalance: 0,
  income: 0,
  expense: 0,
  addTransaction: transaction => {}
})

export default ExpenseTrackerContext
