import { Meetup } from "src/app/models/meetup.models";

export interface MeetupsState {
  meetups: Meetup[];
	filters: {meetupName: string | null, ownerFio: string| null}
}