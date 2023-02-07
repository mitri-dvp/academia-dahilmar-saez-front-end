import { api } from "@utils/http";
import qs from "qs";

const studentPopulate = {};

export const getStudents = async () => {
  const queryString = qs.stringify({
    populate: studentPopulate,
  });

  const students = await api.get<CollectionResponse<Student[]>>(
    `/students?${queryString}`
  );

  return students.data;
};
