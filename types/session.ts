export interface SessionProps {
  user: {
    name: string
    email: string
    id: string | number
    randomKey: string
  }
  expires?: string
  token?: string
}