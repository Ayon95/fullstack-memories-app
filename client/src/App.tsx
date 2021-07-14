import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from './style/globalStyles';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/Generic/ProtectedRoute';
import { authActions } from './redux/slices/auth/authSlice';
import { useEffect } from 'react';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// getting user from local storage
		const user = localStorage.getItem('memoriesUser');
		if (!user) return;
		// dispatching action to set user in redux store if user exists
		dispatch(authActions.setUser(JSON.parse(user)));
	}, [dispatch]);

	return (
		<>
			<GlobalStyles />
			<Router>
				<Switch>
					<Route exact path="/">
						<Welcome />
					</Route>

					<ProtectedRoute path="/home" component={Home} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
