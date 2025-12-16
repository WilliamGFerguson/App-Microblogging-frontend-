<script setup lang="ts">
import Button from '../inputs/Button.vue';
import UserAvatar from '../users/UserAvatar.vue';
import EmojiButton from '../inputs/EmojiButton.vue';
import CloseIcon from '../icons/CloseIcon.vue';
import useUserStore from '../../stores/userStore';
import postStore from '../../stores/postStore';
import { useI18n } from 'vue-i18n';
import { toastSuccess} from '../../utils/notify';

const userStore = useUserStore()
const posts = postStore()
const { t } = useI18n()

const handleCreate = async () => {
  if(!userStore.newPost.trim()) return;
  await posts.create(userStore.newPost);
  toastSuccess('Post sent!');
  userStore.clearNewPost();
  await posts.load(1, false)
}
</script>

<template>
  <article class="flex justify-center px-2 w-full pb-3 border-b-5 border-[var(--bg-dark)] lg:px-10">
    <div class="w-10 pt-2">
      <UserAvatar size="sm" />
    </div>
    <div class="flex flex-col w-full gap-3 px-2">
      <textarea v-model="userStore.newPost" class="p-2 rounded-md outline-1 outline-[var(--border)] resize-none focus:outline-[var(--text)]" :placeholder="t('publish_long')"></textarea>
      <div class="flex justify-between">
        <div class="pl-2 flex gap-1">
          <EmojiButton />
          <CloseIcon v-if="userStore.newPost !== ''" size="sm" @clear="userStore.clearNewPost" />
        </div>
        <Button :label="t('publish')" size="md" @click="handleCreate" />
      </div>
    </div>
  </article>
</template>