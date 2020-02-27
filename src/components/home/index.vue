<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <el-button type="primary" icon="el-icon-refresh-left" class="reload-btn" @click="reload" v-if="tagsList.length>0">刷新</el-button>
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view v-if="showChild"></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from '@/components/common/Header.vue';
    import vSidebar from '@/components/common/Sidebar.vue';
    import vTags from '@/components/common/Tags.vue';
    import bus from '@/components/common/bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                showChild:true, //展示子节点
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
        methods:{
            reload(){
                if(!this.$route.matched[1]){return;};
                let name=this.$route.matched[1].components.default.name;
                let index = this.tagsList.indexOf(name);
                if(index == -1){return;};
                this.tagsList.splice(index,1);
                this.showChild=false;
                this.$nextTick(_ =>{
                    this.tagsList.push(name);
                    this.showChild=true;
                });
            },
            //根据名字清楚指定缓存  这里需要把关联关系搞一下 暂时先不做 做法是 新建一个脚本存放 关联关系  然后掉指定页面清除缓存的方法
            clearRoutecCacheWithName(name){
                if(!this.$route.matched[1]){return;};
                let index = this.tagsList.indexOf(name);
                if(index == -1){return;};
                this.tagsList.splice(index,1);

            }
        }
    }
</script>
<style scoped lang="scss">
    .reload-btn{
       position: absolute;
       right: 5px;
       top: 10px;
       z-index: 100;
    }

</style>
