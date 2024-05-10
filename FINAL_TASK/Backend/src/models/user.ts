export interface UserModel {
    /**
     * @example null
     */
    userId?: string | null;
    /** @maxLength 100 */
    userName: string;
    /** @maxLength 50  */
    phone: string;
    /** @maxLength 100 */
    email: string;
    /** @default null */
    info?: any;
}

export interface FullUserModel extends UserModel {
    /** @maxLength 100 */
    password: string | null;
    /** @maxLength 100 */
    token: string | null;
    tokenDate: Date | null;
}

export interface RoleModel {
    /** @maxLength 20 */
    roleId: string;
    /** @maxLength 100 */
    roleName: string;
}

export interface UserRoleModel {
    userId: number;
    roleId: string;
}

export type UserErrorType = {
    message: string
}