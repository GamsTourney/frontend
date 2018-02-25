import MatchDetail from './views/detail'
import MatchScore from './views/score'

const root = '/matches'
export default {
  [root + '/:id']: MatchDetail,
  [root + '/:id/score']: MatchScore
}
