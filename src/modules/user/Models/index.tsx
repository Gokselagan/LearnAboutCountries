export interface RegistrationFormProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface userState {
    isSignedIn: boolean;
    registeredUser: RegistrationFormProps;
    newUser: RegistrationFormProps;
}