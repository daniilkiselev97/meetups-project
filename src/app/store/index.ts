import { allMeetupsNode, allMeetupsReducer } from "./all-meetups/all-meetups.reducers";
import { authNode, authReducer } from "./auth/auth.reducers";
import { myMeetupsNode, myMeetupsReducer } from "./myMeetups/myMeetups.reducers";
import { usersNode, usersReducer } from "./users/users.reducers";

export const reducers = {
	[authNode]: authReducer,
	[allMeetupsNode]: allMeetupsReducer,
	[myMeetupsNode]: myMeetupsReducer,
	[usersNode] : usersReducer
};