import { Timestamp } from 'firebase/firestore';

export type Game = {
    country: string;
    province: string;
    city: string;
    date: Timestamp;
    place: string;
    createdByUser: string;
    dateCreated: Timestamp,
    sport: string;
    spots: number;
    gender: {
      text: string,
      value: string,
      icon: string
    }[];
    type: {
      text: string,
      value: string,
      icon: string
    }[];
    size: {
      text: string,
      value: string
    }[];
    grassType: {
      text: string,
      value: string,
      icon: string
    }[];
    status: string;
    description: string;
    usersAttending: {
      userId: number
    }[];
    usersWaiting: {
      userId: number
    }[];
  };
  