import TournamentList from './views/index'
import TournamentSchedule from './views/schedule'
import TournamentLive from './views/live'

const root = '/tournaments'
export default {
  [root]: TournamentList,
  [root + '/:id/schedule']: TournamentSchedule,
  [root + '/:id/live']: TournamentLive
}
