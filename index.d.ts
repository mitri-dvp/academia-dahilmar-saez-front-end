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

type UserPhoto = {
  id: number;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

type UserRole = {
  id: number;
  type: string;
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
