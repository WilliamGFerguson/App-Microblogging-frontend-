<script setup lang="ts">
import UserAvatar from '../users/UserAvatar.vue';
import HeartIcon from '../icons/HeartIcon.vue';
import { computed, onMounted } from 'vue';
import useUserStore from '../../stores/userStore';
import postStore from '../../stores/postStore';
import Swal from 'sweetalert2';
import { confirmDialog, toastSuccess} from '../../utils/notify';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{
  post: import('../../stores/postStore').PostItem
  compact?: boolean
}>()
const userStore = useUserStore()
const posts = postStore()

const styleData = {
  full: "flex lg:grid-cols-[1fr_12fr_1fr]",
  compact: "grid-cols-[13fr_1fr] pl-5"
}

const style = computed(() => {
  const cardType = props.compact ? "compact" : "full"
  return styleData[cardType]
})

//affiche un bon label, si author est un string je l'envoie direct sinon j'essaie author.username ou _id
const authorLabel = computed(() => {
  const a: any = props.post.author
  if (a.username === userStore.currentUser?.username) {
    return 'Me'
  }
  if (typeof a === 'object' && a?.username) {
    return a.username
  }
  if (typeof a === 'string') {
    return `User ${a.slice(0,6)}…`   //affiche juste les 6 premiers chars pour éviter le pavé
  }
  return 'user'
})

//va récupérer me depuis le store, si me est dans l'array des likes d'un post et colore le coeur d'un like
const likedByMe = computed(() => {
  const me = userStore.currentUser?.id
  if (!me) return false
  return props.post.likes?.includes(me)
})
const likeCount = computed(() => props.post.likes?.length || 0)

const toggle = () => posts.toggleLike(props.post.id)
const isPending = computed(() => posts.isToggling(props.post.id)) //pour la p'tite pulse animation

const canManage = computed(() => { //savoir si le user est soit l'auteur d'un post, soit un moderator/admin
  const me = userStore.currentUser
  const isAuthor = String(props.post.author) === userStore.currentUser?.id || props.post.author.id === userStore.currentUser?.id
  
  if (!me) return false
  const isMod = me.role === 'admin' || me.role === 'moderator'  
  return isAuthor || isMod
})

async function handleDelete() {
  if (!canManage.value) return
  const confirm = await confirmDialog('Confirm deletion?')
  if (!confirm) return
  try {
    await posts.deletePost(props.post.id)
  } catch (e: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: e?.message || 'Error during deletion'
    })
  }
}

async function handleEdit() {
  if (!canManage.value) return
  const next = prompt('Modify post:', props.post.content)
  if (next == null) return
  const content = next.trim()
  if (!content || content === props.post.content) return
  try {
    await posts.updatePost(props.post.id, content)
    toastSuccess("Post modified!");
  } catch (e: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: e?.message || 'Error during edit'
    })
  } finally {
    posts.load(1, false)
  }
}

//section ajoutée pour follow un user dans ma post card
const authorId = computed(() => {
  const a: any = props.post.author;
  return typeof a === 'string' ? a : (a?._id || a?.id || '');
});
onMounted(() => {
  if (authorId.value) userStore.loadFollowingStatusFor(authorId.value);
});
const meId = computed(() => userStore.currentUser?.id || null);
const canFollow = computed(() => meId.value && authorId.value && meId.value !== authorId.value);
const following = computed(() => authorId.value ? userStore.isFollowing(authorId.value) : false);
const followLabel = computed(() => following.value ? 'unfollow' : 'follow');

const onToggleFollow = async () => {
  if (!authorId.value) return;
  try {await userStore.toggleFollow(authorId.value);}
  catch (e: any) {}
};
</script>

<template>
  <div :class="style" class="grid w-full pt-5 pb-3 border-b-1 gap-2 border-[var(--border)] hover:bg-neutral-500/10 group">
    <div v-if="!props.compact" class="lg:flex lg:justify-center">
      <UserAvatar size="md" />
    </div>
    <div class="flex flex-col gap-1 lg:px-2 lg:gap-3">
      <div v-if="!props.compact" class="flex items-center gap-2 mb-2">
        <b>{{authorLabel}}</b>
        <p class="opacity-[0.6]">- {{new Date(props.post.datePosted).toLocaleString()}}</p>
      </div>
      <p class="text-start pr-8">{{props.post.content}}
      </p>
      <button class="flex items-center gap-1 hover:opacity-70" :class="likedByMe ? 'text-red-500' : ''" @click="toggle" :disabled="!userStore.currentUser || isPending">
        <HeartIcon :class="[isPending ? 'like-pulse' : '']" />
        <b>{{likeCount}}</b>
      </button>
    </div>
    <div class="flex lg:flex-col justify-evenly items-start opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
      <button v-if="canFollow" class="text-sm hover:opacity-70 disabled:opacity-50" @click="onToggleFollow"> {{ t(followLabel) }}</button>
      <p v-else></p>
      <button v-if="canManage" class="text-sm text-[var(--accent)] hover:opacity-70" @click="handleEdit">{{ t('edit') }}</button>
      <button v-if="canManage" class="text-sm text-red-500 hover:opacity-70" @click="handleDelete">{{ t('delete') }}</button>
    </div>
  </div>
</template>