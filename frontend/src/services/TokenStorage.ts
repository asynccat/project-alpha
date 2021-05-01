
export class TokenStorage {
    saveToken(payload: string): void {
        return localStorage.setItem('token', payload)
    }
    getToken(): string | null {
       return localStorage.getItem('token')
    }
    removeToken(): void {
        return localStorage.removeItem('token')
    }

    getRefresh(): string | null {
        return localStorage.getItem('refresh')
    }

    saveRefreshToken(payload: string): void {
        return localStorage.setItem('refresh', payload)
    }

}
