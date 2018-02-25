import TournamentList from './views/index'
import TournamentSchedule from './views/schedule'

const root = '/tournaments'
export default {
  [root]: TournamentList,
  [root + '/:id/schedule']: TournamentSchedule
}
