import { Timestamp } from 'firebase/firestore';
import Historical from '@/types/Historical'

type User = {
    id: string,
    name: string;
    lastName: string;
    email: string;
    country: string;
    province: string;
    city: string;
    age: number;
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
  };

  export default User;