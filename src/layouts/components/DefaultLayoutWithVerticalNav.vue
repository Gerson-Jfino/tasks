<script setup>
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { useTheme } from 'vuetify'

// Components
import api from '@/config/api'
import Footer from '@/layouts/components/Footer.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import { ref } from 'vue'

const vuetifyTheme = useTheme()

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})

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
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>



        <VSpacer />


        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink v-if="user.role_id == '1'" :item="{
        title: 'Dashboard',
        icon: 'bx-home',
        to: '/dashboard',

      }" />

      <VerticalNavLink :item="{
        title: 'Actividades',
        icon: 'bx-book',
        to: '/actividades',
      }" />
      <VerticalNavLink :item="{
        title: 'Incidentes',
        icon: 'bx-book',
        to: '/incidentes',
      }" />
      <VerticalNavLink v-if="user.role_id == '1'" :item="{
        title: 'Utilizadores',
        icon: 'bx-user',
        to: '/utilizadores',
      }" />
    </template>


    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
