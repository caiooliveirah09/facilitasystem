export default interface IUser {
  id?: string;
  email: string;
  password: string;
  tasks?: [
    {
      title: string;
      description: string;
    }
  ];
}
