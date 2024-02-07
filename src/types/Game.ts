import { Timestamp } from 'firebase/firestore';

type Game = {
    id: string,
    country: string;
    province: string;
    city: string;
    date: Timestamp;
    place: string;
    organizerId : string;
    organizerInfo: {
      userId: string,
      fullName: string,
      email: string,
      phoneNumber: string
    };
    dateCreated: Timestamp,
    sport: string;
    spots: number;
    payment: string;
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
  
  export default Game;