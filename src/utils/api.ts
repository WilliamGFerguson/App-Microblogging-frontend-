//helper pour que le frontend puisse récupérer/communiquer avec ce qui est en backend
const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:3000";

//stocker, relire mon jwt pour que quand je refresh, mon token est encore good
const TOKEN_KEY = "gazouille_token";
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

//pour enlever le besoin d'écrire fetch+headers+error_handling à chaque appel de mon api
async function request<T>(
  path: string,
  opts: RequestInit = {},
  auth = false
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    ...opts,
    headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    //le backend renvoie {status, code, message}
    const msg = (data && data.message) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

export async function apiLogin(username: string, password: string) {
  type LoginResp = { user: any; token: string };
  const resp = await request<LoginResp>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  //persiste le token pour les requêtes d'après
  setToken(resp.token);
  return resp;
}

export async function apiAuthMe() {
  type MeResp = {user: any};
  return request<MeResp>("/auth/me", {method: "GET"}, true);
}

export async function apiRegister(username: string, email: string, password: string){
  type RegResp = {user: any; token?: string}
  const data = await request<RegResp>("/auth/register" , {
    method: "POST",
    body: JSON.stringify({username, email, password}),
  })
  if (data.token) setToken(data.token);
  return data;
}

//endpoints pour les posts 
type FeedResp = { //je veux typer la réponse du backend pour le feed, items = tableau de posts, meta = infos de pagination
  items: any[];
  meta: {total: number; page: number; pages: number; hasNext: boolean};
};

export async function apiGetPosts(page = 1, limit = 10) {
  return request<FeedResp>(`/posts?page=${page}&limit=${limit}`, {method: "GET"});
}

export async function apiCreatePost(content: string) {
  return request<any>(
    "/posts",
    {method: "POST", body: JSON.stringify({content})},
    true
  );
}

export async function apiToggleLike(postId: string) {
  return request<any>(`/posts/${postId}/like`, {method: "POST"}, true);
}

export async function apiUpdatePost(id: string, content: string) {
  type Resp = { id: string; author: string; content: string; datePosted: string; likes: string[] };
  return request<Resp>(
    `/posts/${id}`,
    { method: "PATCH", body: JSON.stringify({content}) },
    true
  );
}

export async function apiDeletePost(id: string) {
  await request<unknown>(`/posts/${id}`, {method: "DELETE"}, true);
  return { ok: true };
}

//section pour brancher mon follow/unfollow avec mon backend
//rel = relationship entre deux users aka je le follow ou pas
export type RelResp = {following: boolean; followers: number};
export type FollowResp = {ok: true; followers: number};
export async function apiGetUserRel(userId: string) {
  return request<RelResp>(`/users/${userId}/rel`, {method: "GET"}, true);
}
export async function apiFollow(userId: string) {
  return request<FollowResp>(`/users/${userId}/follow`, {method: "POST"}, true);
}
export async function apiUnfollow(userId: string) {
  return request<FollowResp>(`/users/${userId}/follow`, {method: "DELETE"}, true);
}

//section pour "who to follow?" je veux que mon frontend puisse récupérer les users en backend
export async function apiGetUsers() {
  return request<any[]>("/users", { method: "GET" }, true);
}
export async function apiFollowUser(targetId: string) {
  return request<{user: any}>(`/users/${targetId}/follow`, {method: "POST"}, true);
}

export async function apiUnfollowUser(targetId: string) {
  return request<{user: any}>(`/users/${targetId}/follow`, {method: "DELETE"}, true);
}



export {BASE_URL};