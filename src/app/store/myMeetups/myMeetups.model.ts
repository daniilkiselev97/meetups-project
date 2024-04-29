import { Meetup } from "src/app/models/meetup.models";

export interface MyMeetupsState {
  myMeetups: Meetup[]; 
	filters: {meetupName: string | null, ownerFio: string| null}
}