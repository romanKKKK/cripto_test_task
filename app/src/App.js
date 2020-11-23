import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

// import Main from './pages/Main'
import NoMatch from './pages/NoMatch'
// import WalletPage from './pages/WalletPage'

const Main = React.lazy(() => import('./pages/Main'))
const WalletPage = React.lazy(() => import('./pages/WalletPage'))

import store from './redux/store'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#39298a',
        },
        secondary: {
            main: '#99c7bc',
        },
    },
    typography: {
        fontFamily: ['Roboto Condensed', 'sans-serif'].join(','),
    },
})

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Suspense fallback={<div>...loading</div>}>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Main />
                        </Route>
                        <Route path="/wallet" exact>
                            <WalletPage />
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </Router>
            </Suspense>
        </ThemeProvider>
    </Provider>
)

export default App
