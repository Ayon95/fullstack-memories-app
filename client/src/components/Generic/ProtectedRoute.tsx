import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../redux/store';

type Props = {
	component: React.ComponentType<RouteComponentProps<any>>;
	path: string;
	exact?: boolean;
};

function ProtectedRoute({ component: Component, path, exact }: Props) {
	const currentUser = useSelector((state: RootState) => state.auth.user);
	return (
		<Route
			path={path}
			exact={exact || false}
			render={props => (currentUser ? <Component {...props} /> : <Redirect to="/" />)}
		/>
	);
}

export default ProtectedRoute;
