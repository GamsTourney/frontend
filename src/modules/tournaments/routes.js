import TournamentSchedule from './views/schedule'
import TournamentLive from './views/live'

const root = '/tournaments'
export default {
  [root + '/:id/schedule']: TournamentSchedule,
  [root + '/:id/live']: TournamentLive
}
