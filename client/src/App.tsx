import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from './style/globalStyles';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/slices/auth/authThunks';
import ProtectedRoute from './components/Generic/ProtectedRoute';

function App() {
	const dispatch = useDispatch();

	// getting user (if any) from local storage
	dispatch(getUser());
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
