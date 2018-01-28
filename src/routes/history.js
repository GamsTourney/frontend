import createHistory from 'history/createBrowserHistory'

const history = createHistory()

export function getHistory() {
  return history
}