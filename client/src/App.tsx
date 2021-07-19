import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from './style/globalStyles';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import ProtectedRoute from './components/Generic/ProtectedRoute';
import PostDetails from './pages/PostDetails';

function App() {
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
				</Switch>
			</Router>
		</>
	);
}

export default App;
