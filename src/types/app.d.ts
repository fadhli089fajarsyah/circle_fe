export interface IThread {
  id?: number;
  content?: string;
  images?: IThreadImage[];
  userId?: number;
  threadId?: number;
  author?: IUser;
  createdAt?: string;
  like?: ILike[];
  _count?: ICount;
}

interface ICount {
  replies?: number;
  like?: number;
}

interface ILike {
  threadId?: number;
  userId?: number;
}

interface IThreadImage {
  image?: string;
}

export interface IUser {
  id: number;
  fullname: string;
  username: string;
  email: string;
  _count?: {
    follower?: number;
    following?: number;
  };
  profile: IProfile;
  follower: IFollow[];
  following: IFollow[];
}

interface IFollow {
  followerId: number;
  followingId: number;
}

export interface IProfile {
  bio?: string;
  avatar?: string;
  cover?: string;
  user: IUser;

  // countFollowers?: number
  // countFollowing?: number
}

export interface IFollows {
  follower?: IUser;
  following?: IUser;
}
