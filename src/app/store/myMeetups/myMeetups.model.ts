import { Meetup } from "src/shared/models/meetup.models";

export interface MyMeetupsState {
	myMeetups: Meetup[];
	filters: { meetupName: string | null, ownerFio: string | null }
}