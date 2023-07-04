import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface ResponseType {
  id: string;
  title: string;
  subTitle: string;
  cost: number;
  duration: string;
  description: string;
  location: string;
  img: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  type: string;
}

export const initialResponse = {
  id: '',
  title: '',
  subTitle: '',
  description: '',
  cost: 0,
  duration: '',
  location: '',
  img: '',
  images: [],
  createdAt: '',
  updatedAt: '',
  type: '',
};

export interface ResponseTypeBooking {
  id?: string;
  itemId: string;
  email: string;
  name: string;
  phoneNumber: string;
  type: string;
  userId: string;
  description?: string;
  date: Timestamp;
  itemInfo: ResponseType;
  status: 'pending' | 'accepted' | 'canceled';
}

type CustomBooking = Omit<
  ResponseType,
  'id' | 'cost' | 'subTitle' | 'img' | 'images'
>;

export type ResponseTypeCustomBooking = CustomBooking & {
  id?: string;
  name: string;
  phone: string;
  budget: number;
  userId: string;
  userInfo: User;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  status: 'pending' | 'accepted' | 'canceled';
};
