import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from './style/globalStyles';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Welcome from './pages/Welcome';

function App() {
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
