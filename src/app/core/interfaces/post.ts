import { TagType } from "../enums/tag";

export interface Post {
  id: number;
  thumbnail: string;
  professor: string;
  description: string;
  title: string;
  urlVideo: string;
  attachments: string[];
  instrument: string;
  tag: TagType;
}
