type User = {
  id: number;
  firstName: string;
  lastName: string;
  documentID: string;
  dateOfBirth: string;
  username: string;
  email: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  photo: UserPhoto | null;
};

type UserRole = {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
};

type UserPhoto = {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

type Attendance = {
  id: number;
  datetime: string;
  status: boolean;
  remarks: string;
  user: UserID;
  createdAt: string;
  updatedAt: string;
};

type DraftAttendance = {
  id: number | null;
  status: boolean;
  remarks: string;
  userID: number;
};

type Chat = {
  id: number;
  users: User[];
  createdAt: string;
  updatedAt: string;
};

type Message = {
  id: number;
  message: string;
  user: UserID;
  createdAt: string;
  updatedAt: string;
};

type UserID = {
  id: number;
};

type Group = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  class: Class;
  schedules: Schedule[];
  attendances: Attendance[];
  users: User[];
};

type Class = {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

type Schedule = {
  id: number;
  datetime: string;
  createdAt: string;
  updatedAt: string;
};

type CalendarEvent = {
  id: number;
  name: string;
  datetime: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type Media = {
  id: number;
  attributes: MediaAttributes;
};

type MediaAttributes = {
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

type ResourceMeta = {
  pagination: ResourcePagination;
};

type ResourcePagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type CollectionResponse<T> = {
  data: T;
  meta: ResourceMeta;
};

type PopulateResponse<T> = {
  data: T | null;
};
