import { Timestamp } from 'firebase/firestore';
import Search from '../types/Search'

type Historical = {
  search: Search;
  status: string;//Pending, Completed, Failed
  userGone: boolean;
  starsRating: number;
}

  export default Historical;