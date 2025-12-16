import { defineStore } from "pinia";
import { ref } from "vue";
import { apiGetPosts, apiCreatePost, apiToggleLike, apiDeletePost, apiUpdatePost } from "../utils/api";
import useUserStore from "./userStore";
import axios from "axios";

export type Author = {
  id: string
  username: string
  profilePicture: string
}

export type PostItem = { //déclaration de la forme frontend d'un post
  id: string;
  author: Author;
  content: string;
  datePosted: string;
  likes: string[];
};

//normalize va convertir la réponse mongoose en PostItem propre
function normalize(raw: any): PostItem {
  return {
    id: raw.id || raw._id,
    author: raw.author,
    content: raw.content,
    datePosted: raw.datePosted || raw.createdAt || new Date().toISOString(),
    likes: (raw.likes || []).map((x: any) => String(x))
  };
}

export default defineStore("post", () => {
  const items = ref<PostItem[]>([]);
  const userPosts = ref<PostItem[]>([]);
  const total = ref(0);
  const page = ref(1);
  const pages = ref(1);
  const hasNext = ref(false);
  const loading = ref(false);

  const pendingLike = ref<Set<string>>(new Set());

  //fonction pour charger une page de posts
  async function load(p = 1, append = false) {
    if (loading.value) return;
    loading.value = true;
    try {
      const { items: docs, meta } = await apiGetPosts(p, 10);
      items.value = append ? [...items.value, ...docs] : docs;
      total.value = meta.total;
      page.value = meta.page;
      pages.value = meta.pages;
      hasNext.value = meta.hasNext;
    } finally {
      loading.value = false;
    }
  }

  async function loadFromUser(id: string) {
    if (loading.value) return;
    loading.value = true;
    try {
      userPosts.value = []
      const res = await axios.get<PostItem[]>(`http://localhost:3000/posts/user/${id}`)
      userPosts.value = res.data
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false;
    }
  }

  async function create(content: string) {
    const created = await apiCreatePost(content.trim());
    items.value = [normalize(created), ...items.value];
  }

  async function toggleLike(postId: string) {
    const me = useUserStore().currentUser?.id;
    if (!me) return; //si t'es pas login, stop

    if (pendingLike.value.has(postId)) return;
    const idx = items.value.findIndex(p => p.id === postId);
    if (idx === -1) return; //si je trouve pas l'index du post dans items, stop

    const post = items.value[idx];
    const prevLikes = post.likes.slice(); //snapshot des likes actuels pour rollback si mon opération fail
    const hasLiked = post.likes.includes(me);

    //si me n'est pas dans likes, le push dedans, sinon, filter pour le flusher
    post.likes = hasLiked ? post.likes.filter(id => id !== me) : [...post.likes, me];

    pendingLike.value.add(postId);
    try {
      await apiToggleLike(postId);
    } catch {
      post.likes = prevLikes; //je rollback si mon try catch à fail
    } finally {
      pendingLike.value.delete(postId);
    }
  }

  function isToggling(postId: string) {
    return pendingLike.value.has(postId);
  }

  async function deletePost(id: string) {
    const index = items.value.findIndex(p => p.id === id);
    if (index ===-1) return;
    //backup du post d'un coup toute chie
    const backup = items.value[index];
    items.value.splice(index, 1);

    try{
      const userStore = useUserStore()
      await apiDeletePost(id);
      if (userStore.currentUser) {
        await loadFromUser(userStore.currentUser.id);
      }
    } catch (err) {
      items.value.splice(index, 0, backup);
      throw err;
    }
  }

  async function updatePost(id: string, content:string) {
    const index = items.value.findIndex(p => p.id === id);
    if(index ===-1) return;

    const prev = {...items.value[index]};
    items.value[index] = {...items.value[index], content};
    try {
      const updated = await apiUpdatePost(id, content);
      items.value[index] = {
        id: (updated as any).id || (updated as any)._id || id,
        author: (updated as any).author,
        content: (updated as any).content,
        datePosted: (updated as any).datePosted,
        likes: ((updated as any).likes || []).map((x: any) => String(x)),
      };
    } catch (err) {
      items.value[index] = prev; //rollback
      throw err;
    }
  }


  return {
    items,
    userPosts,
    total,
    page,
    pages,
    hasNext,
    loading,
    load,
    loadFromUser,
    create,
    toggleLike,
    isToggling,
    deletePost,
    updatePost
  };
});
