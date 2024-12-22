import React, { lazy, Suspense } from 'react'
import { Route, Redirect, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom'

import { PUBLIC_ROUTE } from './route.contants.js'
import Auth from './utils/Auth/index.js'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5'
import { parse, stringify } from 'query-string'

// Components
import Loader from './components/loader/index.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
const PrivateScreen = lazy(() => import('./pages/PrivateScreens/index.jsx'));
const Page404 = lazy(() => import('./pages/404.jsx'));

const publicRoutes = [
    {
        path: '/login',
        component: lazy(() => import('./pages/Login/index.jsx')),
        exact: true,
    },
    {
        path: '/change-password',
        component: lazy(() => import('./pages/ChangePassword/index.jsx')),
        exact: true,
    },
    {
        path: '/forgot-password',
        component: lazy(() => import('./pages/ForgotPassword/index.jsx')),
        exact: true,
    },
]

function PrivateRoute({ children, ...rest }) {
    const isLoggedIn = Auth.isLoggedIn().token;
    if (isLoggedIn) return <Route {...rest}>{children}</Route>
    return (
        <Redirect
            to={{
                pathname: '/login',
            }}
        />
    )
}

export default function Routes() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader />}>
                <Router
                    getUserConfirmation={() => {
                    }}
                >
                    <QueryParamProvider
                        adapter={ReactRouter5Adapter}
                        options={{
                            searchStringToObject: parse,
                            objectToSearchString: stringify,
                        }}
                    >
                        <Switch>
                            {publicRoutes.map((route, index) => (
                                <Route key={index} path={route.path} exact={route.exact}>
                                    <route.component />
                                </Route>
                            ))}
                            <PrivateRoute path='/'>
                                <PrivateScreen />
                            </PrivateRoute>
                            <Route component={Page404} />
                        </Switch>
                    </QueryParamProvider>
                </Router>
            </Suspense>
        </ErrorBoundary>
    )
}