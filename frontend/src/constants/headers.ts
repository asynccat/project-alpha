
export const token = localStorage.getItem('token')

export const headersNoAuth = {
    'Content-Type': 'application/json',
    Accept: 'application/json', 
  }
  
export const headersAuth = {
    'Content-Type': 'application/json',
    Accept: 'application/json', 
    Authorization: `Bearer ${token}`
  }