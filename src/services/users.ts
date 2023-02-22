import { api } from "@utils/http";
import qs from "qs";

const userPopulate = {};

export const getUsers = async () => {
  const queryString = qs.stringify({
    populate: userPopulate,
  });

  const users = await api.get<CollectionResponse<User[]>>(
    `/users?${queryString}`
  );

  return users.data;
};
