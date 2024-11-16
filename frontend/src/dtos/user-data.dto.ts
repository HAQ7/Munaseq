export interface UserDataDto {
  id: string;
  firstName: string;
  lastName: string;
  visibleName?: string;
  email: string;
  username: string;
  gender?: string;
  cvUrl?: string;
  profilePictureUrl?: string;
  socialAccounts?: {
    xLink?: string;
    linkedinLink?: string;
  };
  categories: string[];
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
