import * as crypto from "crypto"
export function md5(data: string, digest: 'hex' | 'base64' = 'hex') {
    return crypto.createHash('md5').update(data).digest(digest || 'base64');
}