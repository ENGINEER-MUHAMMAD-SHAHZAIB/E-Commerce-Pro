import { User } from '../types';

interface DecodedToken {
    userId: string;
    email: string;
    exp: number;
    iat: number;
}

const SECRET_KEY = 'phi-horizon-secret-key'; // In a real app, this would be on the server

// Simulate JWT generation
export const generateToken = (user: User): string => {
    const payload: DecodedToken = {
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
        iat: Math.floor(Date.now() / 1000)
    };

    // Create a fake signature
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    const signature = btoa(SECRET_KEY); // Simplified for simulation

    return `${header}.${body}.${signature}`;
};

// Simulate Token Verification
export const verifyToken = (token: string): DecodedToken | null => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = JSON.parse(atob(parts[1])) as DecodedToken;
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp < now) {
            return null; // Token expired
        }

        return payload;
    } catch (error) {
        return null;
    }
};

// Decode token without verification (for UI usage if needed)
export const decodeToken = (token: string): DecodedToken | null => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        return JSON.parse(atob(parts[1]));
    } catch {
        return null;
    }
};
