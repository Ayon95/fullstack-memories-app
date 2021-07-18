import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from './style/globalStyles';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/Generic/ProtectedRoute';
import { authActions } from './redux/slices/auth/authSlice';
import { useEffect } from 'react';
import { checkExpiredToken, getUserFromLocalStorage } from './utils/helpers';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (!user) return;
		// check if the token has expired
		const tokenHasExpired = checkExpiredToken(user.token);
		// log the user out if the token has expired
		if (tokenHasExpired) {
			localStorage.removeItem('memoriesUser');
			dispatch(authActions.removeUser());
		}
		// dispatching action to set user in redux store if user exists
		dispatch(authActions.setUser(user));
	}, [dispatch]);

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
				</Switch>
			</Router>
		</>
	);
}

export default App;
