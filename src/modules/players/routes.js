import PlayerList from './views/index'
import PlayerDetail from './views/detail'

const root = '/players'
export default {
  [root]: PlayerList,
  [root + '/:id']: PlayerDetail
}