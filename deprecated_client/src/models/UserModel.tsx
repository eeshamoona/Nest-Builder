type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  createdAt: Date;
  lastLogin: Date;
  homeAddress: string;
  workAddress: string;
  birthday: string | null;
  gender: string;
};

export default User;
