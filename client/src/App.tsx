import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from './style/globalStyles';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import ProtectedRoute from './components/Generic/ProtectedRoute';
import PostDetails from './pages/PostDetails';
import { checkExpiredToken, logOut, startLogoutTimer } from './utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { logoutTimerId } from './redux/slices/auth/authThunks';
import NotFound from './pages/NotFound';

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.user?.token);
	// check expired token and update the logout timer if token is still valid
	// this is required to correctly predict the token's remaining time when the user refreshes the app
	useEffect(() => {
		if (!token) return;
		// check if the token is expired or not
		const tokenIsExpired = checkExpiredToken(token);
		// if token is expired, then log the user out
		if (tokenIsExpired) logOut(dispatch);
		// start a new logout timer with the updated remaining time
		else startLogoutTimer(logoutTimerId, dispatch, token);
	}, [dispatch, token]);
	return (
		<>
			<GlobalStyles />
			<Router>
				<Switch>
					<Route exact path="/">
						<Welcome />
					</Route>
					<ProtectedRoute exact={true} path="/home" component={Home} />
					<ProtectedRoute path="/home/search" component={Home} />
					<ProtectedRoute path="/posts/:id" component={PostDetails} />
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
