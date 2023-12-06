export default interface User {
  id?: string;
  firstName: string;
  lastname?: string;
  phoneNumber?: string;
  email: string;
  password?: string;
  admin: boolean;
}
