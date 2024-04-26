<script setup>
import api from '@/config/api';
import { onMounted, ref } from 'vue';
import avatar1 from '../../assets/logo.png';
const user = ref({})

const getProfile = () => {
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("TOKEN_AUTH")}` }
  };
  api.get("/users/me", config).then((res) => {
    user.value = res.data
  }).catch((error) => {
    console.log(error)
  })
}

onMounted(() => {
  getProfile()
})
</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ user.name }}
            </VListItemTitle>
            <VListItemSubtitle v-if="user.role_id = 1">Admin</VListItemSubtitle>
            <VListItemSubtitle v-else>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />
          <VListItem to="/login">
            <template #prepend>
              <VIcon class="me-2" icon="bx-log-out" size="22" />
            </template>

            <VListItemTitle>Sair</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
