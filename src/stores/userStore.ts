import { defineStore } from "pinia";
import type { UserData } from "../types/User";
import { computed, ref, watch } from "vue";
import type { FormType } from "../types/FormType";
import { clearToken, getToken, apiAuthMe, apiGetUserRel, apiGetUsers, apiFollow, apiUnfollow } from "../utils/api";
import axios, { AxiosError } from "axios";
import useSessionStore from "./sessionStore";

const user: UserData = {
  id: "abcxyz123",
  username: "admin",
  password: "1234",
  email: "admin@gazouille.com",
  role: "admin",
  likedPosts: [],
  followers: [],
  createdAt: "2025-12-13"
}

const useUserStore = defineStore('user', () => {
  // TODO transférer currentUser, login/logout dans session
  const currentUser = ref<UserData | null>(user)
  const allUsers = ref<UserData[]>([])
  const lang = ref<'fr' | 'en'>('fr')
  const displayAuthForm = ref<boolean>(false)
  const formType = ref<FormType>("login")
  const newPost = ref<string>("")
  const followingUsers = ref<UserData[]>([])
  const suggestions = ref<UserData[]>([]);
  const following = ref<string[]>([]);
  const loadedFromBack = ref<Set<string>>(new Set());
  const filterType = ref<'all' | 'username'>('all')
  const filterValue = ref<string>('')

  //section pour follow/unfollow
  const isFollowing = (userId: string) => following.value.includes(userId);
  const _addLocal = (userId: string) => {
    if (!isFollowing(userId)) following.value.push(userId);
  };
  const _removeLocal = (userId: string) => {
    following.value = following.value.filter(id => id !== userId);
  };
  async function loadFollowingStatusFor(userId: string) {
    const me = currentUser.value?.id;
    if (!me || !userId || me === userId || loadedFromBack.value.has(userId)) return;
    try {
      const { following: f } = await apiGetUserRel(userId);
      if (f) _addLocal(userId);
    } finally {
      loadedFromBack.value.add(userId);
    }
  }

  async function toggleFollow(userId: string) {
    const me = currentUser.value?.id;
    if (!me || !userId || me === userId) return;

    const was = isFollowing(userId);
    if (was) _removeLocal(userId); else _addLocal(userId);

    try {
      if (was) await apiUnfollow(userId);
      else await apiFollow(userId);
    } catch (e) {
      //rollback si fail
      if (was) _addLocal(userId); else _removeLocal(userId);
      throw e;
    }
  }

  const usersFiltered = computed(() => {
    switch (filterType.value) {
      case "all":
        return allUsers.value
      case "username":
        return allUsers.value.filter(user => user.username.includes(filterValue.value))
      default:
        return allUsers.value
    }
  })

  watch(filterValue, () => {
    if (filterValue.value === '') {
      filterType.value = 'all'
    } else {
      filterType.value = 'username'
    }
  })

  const changeLang = (newLang: 'fr' | 'en') => {
    lang.value = newLang
  }

  const toggleAuthForm = (type: FormType = 'login') => {
    formType.value = type
    displayAuthForm.value = !displayAuthForm.value
  }

  const changeFormType = (type: FormType) => {
    formType.value = type
  }

  const setCurrentUser = (u: UserData | null) => {currentUser.value = u;};
  const logout = () => {clearToken();currentUser.value = null;};
  const loadFromToken = async () => {
    const token = getToken();
    if (!token) return; //pas de token -> rien à faire
    try {
      const {user} = await apiAuthMe();
      currentUser.value = user;
    } catch {
      clearToken();
      currentUser.value = null;
    }
  };

  const updateNewPost = (content: string) => {
    newPost.value += content
  }

  const clearNewPost = () => {
    newPost.value = ""
  }

  const fetchUsers = () => {
    allUsers.value = []
    axios.get<UserData[]>('http://localhost:3000/users')
      .then((res) => allUsers.value = res.data)
      .catch((err) => console.error(err as AxiosError<{ code? :string }>))
  }

  const getFollowingUsers = () => {
    const sessionStore = useSessionStore()
    followingUsers.value = []
    axios.get<UserData[]>('http://localhost:3000/users/following', { headers: sessionStore.auth })
      .then((res) => {
        followingUsers.value = res.data
      })
      .catch((err) => console.error(err as AxiosError<{ code? :string }>))
  }

  async function loadFollowSuggestions(n = 4) {
    const me = currentUser.value?.id;
    if (!me) {suggestions.value = []; return;}
    const all = await apiGetUsers();

    //un user est "déjà suivi" si SON array de followers contient mon id
    const notFollowed = (all || []).filter(u =>
      u.id !== me &&
      !(u.followers || []).some((f: { userId: string }) => f.userId === me)
    );

    //petite randomisation
    for (let i = notFollowed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [notFollowed[i], notFollowed[j]] = [notFollowed[j], notFollowed[i]];
    }
    suggestions.value = notFollowed.slice(0, n);
  }

  async function followUser(targetId: string) {
    const me = currentUser.value?.id;
    if (!me) return;
    await apiFollow(targetId);
    suggestions.value = suggestions.value.filter(u => u.id !== targetId);
  }

  return {
    currentUser,
    allUsers,
    usersFiltered,
    lang,
    displayAuthForm,
    formType,
    newPost,
    filterType,
    filterValue,
    followingUsers,
    suggestions,
    changeLang,
    toggleAuthForm,
    changeFormType,
    setCurrentUser,
    logout,
    loadFromToken,
    toggleFollow,
    isFollowing,
    loadFollowingStatusFor,
    updateNewPost,
    clearNewPost,
    fetchUsers,
    getFollowingUsers,
    loadFollowSuggestions,
    followUser,
  }
})

export default useUserStore