type User = {
  id: number;
  firstName: string;
  lastName: string;
  documentID: number;
  dateOfBirth: string;
  username: string;
  email: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
};

type UserAttributes = {
  name: string;
};

type Media = {
  id: number;
  attributes: MediaAttributes;
};

type MediaAttributes = {
  name: string;
  url: string;
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
