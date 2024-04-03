import { User } from "./user.models";

export interface MeetupBackend {
	id: number;
	name: string;
	description: string;
	location: string;
	target_audience: string;
	need_to_know: string;
	will_happen: string;
	reason_to_come: string;
	time: Date;
	duration: number;
	createdBy: number;
	owner: User;
	users: User[];
}

export interface MeetupForAuthUser extends MeetupBackend {
	authUser: User | null,
	authUserIsOwner: boolean;
	registeredForMeetup: boolean;
}