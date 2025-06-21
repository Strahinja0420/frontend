export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface addAuctionData {
    images?: any ;
    title: string;
    description: string;
    startingBid: string;
    endTime: string;
    category? : string;
}

export interface UpdateUserData{
    firstName: string;
    lastName: string;
    email: string;
}

export interface UpdatePasswordData{
  currentPassword: string;
  newPassword: string;
}
