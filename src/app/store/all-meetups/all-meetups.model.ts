import { Meetup } from "src/shared/models/meetup.models";

export interface MeetupsState {
	meetups: Meetup[];
	filters: { meetupName: string | null, ownerFio: string | null }
}