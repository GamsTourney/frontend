import React from 'react'
import { Route } from 'react-router'
import PrivateRoute from './private'

import TournamentLive from 'modules/tournaments/views/live'
import Login from 'modules/login'

import tournamentRoutes from 'modules/tournaments/routes'
import playerRoutes from 'modules/players/routes'
import gameRoutes from 'modules/games/routes'
import matchRoutes from 'modules/matches/routes'

function combineRoutes(routes) {
  return Object.keys(routes).map((route) => {
    const {component, admin} = routes[route]

    if (admin) {
      return (
        <PrivateRoute
          exact
          key={route}
          path={route}
          component={component}
        />
      )
    }

    return (
      <Route
        exact
        key={route}
        path={route}
        component={component}
      />
    )
  })
}

export default combineRoutes({
  '/': { component: TournamentLive },
  '/login': { component: Login },
  ...tournamentRoutes,
  ...playerRoutes,
  ...gameRoutes,
  ...matchRoutes
})
