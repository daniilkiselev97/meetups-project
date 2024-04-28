import { allMeetupsNode, allMeetupsReducer } from "./all-meetups/all-meetups.reducers";
import { authNode, authReducer } from "./auth/auth.reducers";

export const reducers = {
	[authNode]: authReducer,
	// [allMeetupsNode]: allMeetupsReducer
};