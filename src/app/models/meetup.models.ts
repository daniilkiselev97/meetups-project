import { MeetupBackendUser, User } from "./user.models";

export interface MeetupBackend {
	id: string;
	name: string;
	description: string;
	location: string;
	target_audience: string;
	need_to_know: string;
	will_happen: string;
	reason_to_come: string;
	time: string;
	duration: string;
	createdBy: number;
	owner: MeetupBackendUser;
	users: MeetupBackendUser[];
	createdAt: string;
}

export interface MeetupCreated {
	name: string;
	time: string;
	location: string;
	description: 	string;
	target_audience: string;
	need_to_know: string;
	will_happen: string;
	reason_to_come: string;
	duration: number;
}



export interface Meetup extends MeetupBackend {
	authUser: User | null;
	authUserIsOwner: boolean;
	registeredForMeetup: boolean;
}