import GameList from './views/index'
import GameDetail from './views/detail'

const root = '/games'
export default {
  [root]: GameList,
  [root + '/:id']: GameDetail
}
