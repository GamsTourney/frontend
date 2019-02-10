import GameList from './views/index'
import GameDetail from './views/detail'

const tournament_root = '/tournaments'
const root = '/games'
export default {
  [tournament_root + '/:id' + root]: { component: GameList },
  [root + '/:id']: { component: GameDetail }
}
