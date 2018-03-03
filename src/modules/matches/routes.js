import MatchDetail from './views/detail'
import MatchScore from './views/score'

const root = '/matches'
export default {
  [root + '/:id']: { component: MatchDetail },
  [root + '/:id/score']: { component: MatchScore, admin: true }
}
