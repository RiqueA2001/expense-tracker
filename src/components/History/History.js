import classes from './History.module.css'
import HistoryList from './HistoryList'

const History = () => {
  return (
    <div className={classes.history}>
      <h3>History</h3>
      <HistoryList />
    </div>
  )
}

export default History
