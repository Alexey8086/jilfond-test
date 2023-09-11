<template>
    <!-- 
        Динамические компонеты, конкатенация строк
        (на выходе получаем в параметре "is" полное название ранее созданного лэйаута).
        Подгружаем тот лэйаут, который указан в роутере
    -->
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, dolorum.</h1>

</template>
  
<script>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, watch} from 'vue'
import { useStore } from 'vuex'


export default {
    components: {  },
    setup() {
        const route = useRoute()
        const store = useStore()
        




        return {

        }
    },


}
</script>

<style lang='scss' scoped>
    @import '@/styles/libs/reset.scss';

</style> 
  