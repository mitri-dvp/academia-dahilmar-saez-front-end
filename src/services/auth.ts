import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";

type SignupValues = {
  firstName: string;
  lastName: string;
  documentID: string;
  dateOfBirth: string;
  email: string;
  password: string;
  role: string;
};

type LoginValues = {
  email: string;
  password: string;
};

export const signup = async (signupValues: SignupValues) => {
  const signupResponse = await publicApi.post<{ token: string; user: User }>(
    `/auth/signup`,
    {
      data: signupValues,
    }
  );

  const { token, user } = signupResponse.data;

  useUserStore.getState().signup(token, user);
};

export const login = async (loginValues: LoginValues) => {
  const loginResponse = await publicApi.post<{ token: string; user: User }>(
    `/auth/login`,
    {
      data: loginValues,
    }
  );

  const { token, user } = loginResponse.data;

  useUserStore.getState().login(token, user);
};
