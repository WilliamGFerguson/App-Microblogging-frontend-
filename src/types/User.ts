export interface UserData {
  id: string
  username: string
  password: string
  email: string
  role: "user" | "moderator" | "admin"
  likedPosts: string[]
  followers: string[]
  createdAt: string
}