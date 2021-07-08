import React from 'react';
import GlobalStyles from './style/globalStyles';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import Navbar from './components/Navbar/Navbar';

function App() {
	return (
		<>
			<GlobalStyles />
			<div className="App">
				<Navbar />
				<main>
					<Posts />
					<Form />
				</main>
			</div>
		</>
	);
}

export default App;
