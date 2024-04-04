import { MeetupBackendUser, User } from "./user.models";

export interface MeetupBackend {
	id: number;
	name: string;
	description: string;
	location: string;
	target_audience: string;
	need_to_know: string;
	will_happen: string;
	reason_to_come: string;
	time: string;
	duration: number;
	createdBy: number;
	owner: MeetupBackendUser;
	users: MeetupBackendUser[];
	createdAt: string;
}



export interface Meetup extends MeetupBackend {
	authUser: User | null,
	authUserIsOwner: boolean;
	registeredForMeetup: boolean;
}