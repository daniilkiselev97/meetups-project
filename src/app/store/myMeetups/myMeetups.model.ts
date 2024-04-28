import { Meetup } from "src/app/models/meetup.models";

export interface MyMeetupsState {
  myMeetups: Meetup[]; 
  // error: string | null; 
}