import { publicApi } from "@lib/http";
import { useUserStore } from "@store/user";

type EditValues = {
  firstName: string;
  lastName: string;
  documentID: string;
  dateOfBirth: string;
  email: string;
  phone: string;
};

type RequestOptions = {
  signal: AbortSignal;
};

export const edit = async (editValues: EditValues) => {
  const editResponse = await publicApi.put<{ token: string; user: User }>(
    `/users/edit`,
    {
      data: editValues,
    },
    { headers: { Authorization: "Bearer " + useUserStore.getState().token } }
  );

  const { user } = editResponse.data;

  useUserStore.getState().edit(user);
};

export const photoUpload = async (photo: File) => {
  const userStore = useUserStore.getState();
  const formData = new FormData();
  formData.append("photo", photo);

  if (userStore.user.photo) {
    formData.append("replaceID", String(userStore.user.photo.id));
  }

  const photoUploadResponse = await publicApi.post<{
    photo: UserPhoto;
  }>(`/users/photo/upload`, formData, {
    headers: {
      Authorization: "Bearer " + useUserStore.getState().token,
    },
  });

  userStore.editPhoto(photoUploadResponse.data.photo);
};

export const photoDelete = async () => {
  const userStore = useUserStore.getState();

  const photoUploadResponse = await publicApi.delete<{
    photo: UserPhoto;
  }>(`/users/photo/upload`, {
    headers: {
      Authorization: "Bearer " + useUserStore.getState().token,
    },
  });

  userStore.editPhoto(photoUploadResponse.data.photo);
};

export const getAthletes = async () => {
  const getResponse = await publicApi.get<{ athletes: User[] }>(
    `/users/athletes`,
    {
      headers: { Authorization: "Bearer " + useUserStore.getState().token },
    }
  );

  const { athletes } = getResponse.data;

  return athletes;
};

export const getUserFromToken = async (
  token: string,
  options: RequestOptions
) => {
  const userResponse = await publicApi.get<{
    user: User;
  }>(`/users/token?token=${token}`, { signal: options.signal });

  const { user } = userResponse.data;

  return user;
};

export const confirmUser = async (token: string) => {
  const userResponse = await publicApi.get<{
    user: User;
  }>(`/users/confirm/token?token=${token}`);

  const { user } = userResponse.data;

  return user;
};
