<template>

    <Message />
    <Main></Main>

</template>
  
<script>
import Main from '@/views/Main.vue'
import Message from '@/components/UI/Message.vue'


export default {
    components: { Main, Message },
    setup() {

        return {

        }
    },


}
</script>

<style lang='scss'>
    @import '@/styles/libs/reset.scss';
</style> 
  