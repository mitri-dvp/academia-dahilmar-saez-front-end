import { publicApi } from "@utils/http";
import { useUserStore } from "@store/user";

type EditValues = {
  firstName: string;
  lastName: string;
  documentID: string;
  dateOfBirth: string;
  email: string;
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
