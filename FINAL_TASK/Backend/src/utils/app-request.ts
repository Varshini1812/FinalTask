import { Request } from 'express';

export interface AuthUser {
    id: string,
    roles: string[],
    name: string
}

export interface AppRequest extends Request {
    user: AuthUser | null
}

export class AuthError extends Error {
    status: number | undefined | null
}