import { publicApi } from "@lib/http";
import { useUserStore } from "@store/user";
import { useAttendanceStore } from "@store/attendance";
import { socket } from "@lib/socket";
import Router from "next/router";

type SignupValues = {
  firstName: string;
  lastName: string;
  documentID: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  password: string;
  role: string;
};

type LoginValues = {
  email: string;
  password: string;
};

export const signup = async (signupValues: SignupValues) => {
  const signupResponse = await publicApi.post<{
    token: string;
    user: User;
    attendances: Attendance[];
  }>(`/auth/signup`, {
    data: signupValues,
  });

  const { token, user, attendances } = signupResponse.data;

  useUserStore.getState().signup(token, user);
  useAttendanceStore.getState().set(attendances);

  if (user.confirmed) {
    Router.push(`/dashboard/${user.role.type}`);
  }

  if (!user.confirmed) {
    Router.push(`/${user.role.type}/pending`);
  }
};

export const login = async (loginValues: LoginValues) => {
  const loginResponse = await publicApi.post<{
    token: string;
    user: User;
    attendances: Attendance[];
  }>(`/auth/login`, {
    data: loginValues,
  });

  const { token, user, attendances } = loginResponse.data;

  useUserStore.getState().login(token, user);
  useAttendanceStore.getState().set(attendances);

  socket.connect();

  if (user.confirmed) {
    Router.push(`/dashboard/${user.role.type}`);
  }

  if (!user.confirmed) {
    Router.push(`/${user.role.type}/pending`);
  }
};
