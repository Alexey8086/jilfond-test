<template>
    <div v-if="message" class="message alert danger">
        <div class="flex-container">
            <span class="invalid">Произошла ошибка</span>
            <span @click="close" class="alert-close">&times;</span>
        </div>
        <p>{{ message.text }}</p>
        <p><b>Статус запроса: {{ message.status }}</b></p>

    </div>
</template>

<script lang="js">
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: '',
    components: {},
    props: [''],
    emits: [''],

    setup() {
        const store = useStore()
        const message = computed(() => store.getters['message'])

        return {
            message,
            close: () => store.commit('setClearMessage')
        }
    }
}

</script>

<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';

.danger {
    border-left: 5px solid $invalid;

    span:first-child  {
        color: $invalid !important;
    }
}

.message {
    @include fonts.regular;

    top: 50px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    width: 500px;
    background-color: white;
    padding: 10px;
    padding-bottom: 20px;
    border-radius: 15px;
    border-top: 1px solid #353535;
    border-right: 1px solid #353535;
    border-bottom: 1px solid #353535;
    z-index: 10000;

    .flex-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        span:first-child {
            font-size: 1rem;
            color: #353535;
        }

        span:last-child {
            color: $invalid;
            font-size: 1.8rem;
            cursor: pointer;
        }
    }

    p {
        margin-top: 25px;
        font-size: 0.9rem;
        color: #353535;
    }

}
</style> 