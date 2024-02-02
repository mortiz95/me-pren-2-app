import { Timestamp } from 'firebase/firestore';

type User = {
    name: string;
    lastName: string;
    email: string;
    country: string;
    province: string;
    city: string;
    age: number;
    registerDate: Timestamp;
    createdGames: {
      GameId: string;
      Title: string;
      date: string;
    }[];
    attendedGames: {
      GameId: string;
    }[];
    ownerField: boolean;
    subscriptionType: number;
    rating:  {
      GameId: string;
      Rating: number;
    }[];
    phone: number;
    lastLogin: Timestamp;
  };

  export default User;