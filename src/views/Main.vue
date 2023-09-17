<template>
  <div class="wrapper">

    <div class="heading">
      <span>Жилфонд</span>
      <span>Пользователь</span>
    </div>

    <div class="container">

      <Sidebar />

      <section v-if="user.value" class="profile">
        <div class="profile__photo">
          <ImgIcon :height="'170px'" :width="'200px'"/>
        </div>

        <div class="profile__info">
          <h1>{{ user.value.name }}</h1>
          <div class="user-data">
            <span>email:</span>
            &nbsp;
            <span>{{ user.value.email }}</span>
          </div>
          <div class="user-data">
            <span>phone:</span>
            &nbsp;
            <span>{{ user.value.phone }}</span>
          </div>

          <h1>О себе:</h1>
          <span class="user-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio alias esse
            fugiat cum quos labore exercitationem dignissimos tempore laboriosam iste architecto pariatur ratione minima
            eligendi sapiente cupiditate, odio ad aspernatur? Aliquam culpa asperiores iusto odio vitae dolorem ab maiores
            quaerat.</span>
        </div>
      </section>

      <section v-else class="profile-not-selected">
        <span>Выберите сотрудника, чтобы посмотреть его профиль</span>
      </section>

      <HollowDotsSpinner v-if="isLoading.value" :animation-duration="1000" color="#E31F24" />
    </div>
    
  </div>


</template>

<script>
import ImgIcon from '@/components/icons/photo.vue'
import Card from '@/components/UI/Card.vue'
import Sidebar from '@/components/UI/Sidebar.vue'
import { HollowDotsSpinner  } from 'epic-spinners'
import { computed, reactive, toRaw, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: '',
  components: { ImgIcon, Card, Sidebar, HollowDotsSpinner },
  props: [''],
  emits: [''],

  setup() {
    const store = useStore()
    const user = ref(null)
    const isLoading = ref(false)

    user.value = computed(() => {
      return store.state.selectedUser
    })

    isLoading.value = computed(() => {
      return store.state.isLoading
    })

    return {
      user,
      isLoading,
    }
  }
}

</script>

<style scoped lang='scss'>
@import '@/styles/mainPage.scss';

.hollow-dots-spinner {
  position: absolute;
  top: 35%;
  left: 60%;

} 
</style> 