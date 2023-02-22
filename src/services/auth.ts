import { publicApi } from "@utils/http";

type UserValues = {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  documentID: string;
  email: string;
  password: string;
  role: string;
};

export const signup = async (userValues: UserValues) => {
  try {
    console.log(userValues);
    const signupResponse = await publicApi.post<CollectionResponse<User[]>>(
      `/auth/signup`,
      {
        data: userValues,
      }
    );
    return signupResponse;
  } catch (error) {
    return [];
  }
};
