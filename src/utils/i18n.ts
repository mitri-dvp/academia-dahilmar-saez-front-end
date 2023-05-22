const labels = {
  firstName: "Nombre",
  lastName: "Apellido",
  documentID: "Cédula",
  dateOfBirth: "Fecha de nacimiento",
  username: "Usuario",
  email: "Email",
  provider: "Provedor",
};

export const attributeToLabel = (attribute: string): string => {
  return labels[attribute as keyof typeof labels];
};
