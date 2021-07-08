import React from 'react';
import GlobalStyles from './style/globalStyles';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';

function App() {
	return (
		<>
			<GlobalStyles />
			<div className="App">
				<Posts />
				<Form />
			</div>
		</>
	);
}

export default App;
