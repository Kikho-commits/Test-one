
export interface LoginUser{
    username : string,
    password : string
}

export interface SignupUser{
    username : string,
    email : string,
    password : string
}

export interface AuthResponse{
    jwt : string,
    message : string
}

export interface RegisterResponse{
    message : string
}

export interface Product {
    id?: number;
    productName: string;
    quantity: number;
    price: number;
    supplierName : string;
  }

export interface PasswordRequest{
    email : string,
    currentPassword : string,
    newPassword : string
}