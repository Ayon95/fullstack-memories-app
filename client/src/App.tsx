import React from 'react';
import GlobalStyles from './style/globalStyles';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import Navbar from './components/Navbar/Navbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from './redux/slices/posts/postsThunks';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchAllPosts());
	}, [dispatch]);
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
