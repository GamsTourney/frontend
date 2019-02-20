import GameList from './views/index'
import GameDetail from './views/detail'

const tournament_root = '/tournaments'
const root = '/games'
export default {
  [tournament_root + '/:id' + root]: { component: GameList },
  [tournament_root + '/:tournamentId' + root + '/:id']: { component: GameDetail }
}
