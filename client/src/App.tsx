import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from './style/globalStyles';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/slices/auth/authThunks';

function App() {
	const dispatch = useDispatch();
	// getting user (if any) from local storage
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);
	return (
		<>
			<GlobalStyles />
			<Router>
				<Switch>
					<Route path="/home">
						<Home />
					</Route>

					<Route exact path="/">
						<Welcome />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
