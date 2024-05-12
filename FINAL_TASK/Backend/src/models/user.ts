export interface UserModel {
    userId?: string | null;        
    userName: string;              
    phone: string;                  
    email: string;                  
    age: number;                    
    gender: 'male' | 'female' | 'others'; 
    password: string;
    confirmpassword: string;              
    refreshToken?: string | null;   
    accessToken?: string | null;    
}

export interface FullUserModel extends UserModel {
    token: string | null;          
    tokenDate: Date | null;        
}

export interface UserErrorType {
    message: string;               
}
