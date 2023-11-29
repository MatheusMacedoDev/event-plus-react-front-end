import { jwtDecode } from 'jwt-decode';
import { createContext } from 'react';

export const UserContext = createContext({});

export const userDecodeToken = token => {
    const decoded = jwtDecode(token)
    return { 
        nome: decoded.name, 
        role: decoded.role, 
        token 
    }
}