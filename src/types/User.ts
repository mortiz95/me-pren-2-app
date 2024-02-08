import { Timestamp } from 'firebase/firestore';

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
    createdSearches: {
      searchId: string;
      searchDate: string;
    }[];
    attendedSearches: {
      searchId: string;
    }[];
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