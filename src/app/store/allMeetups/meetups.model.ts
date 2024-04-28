import { Meetup } from "src/app/models/meetup.models";

export interface MeetupsState {
  meetups: Meetup[]; 
  // error: string | null; 
}