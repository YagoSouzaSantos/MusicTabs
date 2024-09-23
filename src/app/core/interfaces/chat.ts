import { User } from "./user";

export interface Chat {
  id: number;
  text: string;
  sender: Sender;
  post_id: number;
  timestamp: string;
}

export interface Sender {
  user_id: number;
  name: string;
}

