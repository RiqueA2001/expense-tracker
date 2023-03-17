import Balance from './components/Balance/Balance'
import History from './components/History/History'
import NewTransaction from './components/NewTransaction/NewTransaction'
import ExpenseTrackerContextProvider from './store/ExpenseTrackerContextProvider'

function App() {
  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseTrackerContextProvider>
        <Balance />
        <History />
        <NewTransaction />
      </ExpenseTrackerContextProvider>
    </div>
  )
}

export default App
