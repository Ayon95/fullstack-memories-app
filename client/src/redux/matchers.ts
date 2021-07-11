import { AnyAction, AsyncThunk } from '@reduxjs/toolkit';

// type for the return value of createAsyncThunk
type GenericAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: string }>;

// return types for the pending and rejected action creators, i.e. types for the pending and rejected actions
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

// matcher function that matches all actions whose action type ends with '/pending'
// using a type predicate here to narrow down the type of action parameter
export function isPendingAction(action: AnyAction): action is PendingAction {
	return action.type.endsWith('/pending');
}

// matcher function that matches all actions whose action type ends with '/rejected'
export function isRejectedAction(action: AnyAction): action is RejectedAction {
	return action.type.endsWith('/rejected');
}
