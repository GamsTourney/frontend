import React from 'react'
import { Route } from 'react-router'

import TournamentLive from 'modules/tournaments/views/live'
import tournamentRoutes from 'modules/tournaments/routes'
import playerRoutes from 'modules/players/routes'
import gameRoutes from 'modules/games/routes'
import matchRoutes from 'modules/matches/routes'

function combineRoutes(routes) {
  return Object.keys(routes).map((route) =>
    <Route
      exact
      key={route}
      path={route}
      component={routes[route]}
    />
  )
}

export default combineRoutes({
  '/': TournamentLive,
  ...tournamentRoutes,
  ...playerRoutes,
  ...gameRoutes,
  ...matchRoutes
})
