import PlayerList from './views/index'
import PlayerDetail from './views/detail'

const root = '/players'
export default {
  [root]: { component: PlayerList },
  [root + '/:id']: { component: PlayerDetail }
}
