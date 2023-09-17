<template>
    <div class="card"  @click="setCurrentUser(userId)">
        <div class="card__icon">
            <ImgIcon />
        </div>
        <div class="card__info">
            <span> {{ username }} </span>
            <span>{{ email }}</span>
        </div>
    </div>
</template>

<script>
import ImgIcon from '@/components/icons/photo.vue'
import { useStore } from 'vuex'

export default {
    name: '',
    components: { ImgIcon },
    props: ['username', 'email', 'userId'],
    emits: [''],

    setup() {

        const store = useStore()

        const setCurrentUser = async (id) => {
            store.commit('setIsLoading', true)
            store.commit('setSelectedUserId', id)
            await store.dispatch('loadUser', id)
            setTimeout(() => store.commit('setIsLoading', false), 1000)
        }

        return {
            setCurrentUser,
        }
    }
}

</script>

<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';


.selected-card {
    background-color: #d74545;
}
.card {
    cursor: pointer;
    width: 100%;
    height: 70px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);

    display: flex;
    flex-direction: row;



    &:hover {
        .card__info {
            background-color: #E0E0E0;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }

    .card__icon {
        width: 70px;
        border-right: 1px solid #E0E0E0;
    }

    .card__info {
        width: calc(100% - 70px);
        padding-top: 15px;
        padding-left: 15px;
        padding-right: 5px;
        display: flex;
        flex-direction: column;

        span:nth-child(1) {
            @include fonts.medium;
            font-size: 14px;
        }

        span:nth-child(2) {
            @include fonts.regular;
            font-size: 14px;
            color: $secondary-text;
        }
    }
}
</style> 