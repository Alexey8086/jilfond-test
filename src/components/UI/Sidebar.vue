<template>
  <aside class="sidebar">
    <span class="sidebar__title">Поиск сотрудников</span>
    <input @input="debouncedFunction" v-model="usernames" class="sidebar__search" type="text">
    <span class="sidebar__title">Результаты</span>
    <p v-if="!isSearchingStarts">начните поиск</p>


      <TransitionGroup class="sidebar__search-results" name="notesList" tag="div">
        <Card v-if="users.value" v-for="user in users.value"
        :username="user.username" :email="user.email" :userId="user.id"
        />

        <p class="sidebar__empty-caption" v-if="isSearchingStarts && !users.value">ничего не найдено</p>
      </TransitionGroup>

      <HollowDotsSpinner v-if="isLoading" :animation-duration="1000" color="#E31F24" />
  </aside>
</template>

<script>
import { debounce } from '@/utils/debounce.js'
import Card from '@/components/UI/Card.vue'
import { useStore } from 'vuex'
import { computed, reactive, toRaw, ref } from 'vue'
import { HollowDotsSpinner  } from 'epic-spinners'

export default {
  name: '',
  components: { Card, HollowDotsSpinner },
  props: [''],
  emits: [''],

  setup() {
    const usernames = ref('')
    const store = useStore()
    const users = reactive({ value: null })
    const isSearchingStarts = ref(false)
    const isLoading = ref(false)

    users.value = computed(() => {
      // store.getters не будет явл., прямой зависимостью
      // и поэтому computed не будет реагировать на изменения стейта
      // при использовании геттеров из-за чего мы используем стейт на прямую
      return toRaw(store.state.users)
    })

    const getUsers = async () => {
      isLoading.value = true

      

      isSearchingStarts.value = true
      let data = usernames.value
      const strContainsComma = data.includes(',')

      // если данные с input содержут запятую - формируем
      // массив из параметров для Fetch запроса
      if (strContainsComma) {
        data = data.split(',').map(username => username.trim())
        await store.dispatch('findUsers', data)
      } else {
        data = data.trim().split()
        await store.dispatch('findOneUser', data)
      }

      setTimeout(() => isLoading.value = false, 1000)
    }

    const debouncedFunction = debounce(getUsers, 600)


    return {
      isSearchingStarts,
      isLoading,
      users,
      usernames,
      debouncedFunction,
    }
  }
}

</script>

<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';

.sidebar {
  width: 293px;
  height: 100%;
  padding-left: 23px;
  padding-top: 13px;
  border-right: 1px solid #DEDEDD;

  .sidebar__title {
    @include fonts.medium;
    font-size: 16px;
  }

  .sidebar__search {
    margin-top: 22px;
    margin-bottom: 22px;
    display: flex;
    width: 240px;
    height: 46px;
    padding: 16px;
    border-radius: 8px;
    border: 1.5px solid #E9ECEF;
    background: #FFF;
    color: $secondary-text;
    @include fonts.medium;
    font-size: 14px;
  }

  p {
    color: $secondary-text;
    margin-top: 10px;
    @include fonts.medium;
    font-size: 14px;
  }

  .sidebar__search-results {
    width: 240px;
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
}

.hollow-dots-spinner {
  margin: 0 auto;
}

// стили Transition-group для анимации элементов внутри группы
.notesList-enter-active,
.notesList-leave-active {
  transition: all 0.45s ease;
}

.notesList-enter-from,
.notesList-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.notesList-move {
  transition: transform 0.45s ease;
}
</style> 