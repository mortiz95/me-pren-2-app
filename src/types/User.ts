import { Timestamp } from 'firebase/firestore';
import Historical from '@/types/Historical'

type User = {
    id?: string,
    name: string;
    lastName: string;
    email: string;
    country: string;
    province: string;
    city: string;
    registerDate: Timestamp;
    attendedSearches: Historical[];
    ownerField: boolean;
    subscriptionType: number;
    rating:  {
      SearchId: string;
      Rating: number;
    }[];
    phone: number;
    lastLogin: Timestamp;
    gender: string,
    dateOfBirth: Timestamp | null,
    sport: string,
    position: [],
    motivation: [],
    level: string,
    freeCreateSearch: number,
    freeJoinSearch: number,
    dateStartSubscription: Timestamp | null,
    dateEndOfSubscription: Timestamp | null,
    typeSubscription: number,
    comments: []
  };

  export default User;