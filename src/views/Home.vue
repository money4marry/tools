<template>
    <el-container class="main-container">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu router unique-opened :default-active="$route.path">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>基础功能</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">基本</template>
                            <!--<el-menu-item index="/home">Home</el-menu-item>-->
                            <el-menu-item index="/app/about">About</el-menu-item>
                            <el-menu-item index="/app/drag">拖拽</el-menu-item>
                            <el-menu-item index="/app/video">视频上传</el-menu-item>
                            <el-menu-item index="/app/canvas">Canvas</el-menu-item>
                            <el-menu-item index="/app/puzzle">拼图游戏</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer height="20px">我的小公举</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>

export default {
  name: "home",
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {},
  methods: {

  }
};
</script>

<style lang="scss">
@import "../styles/colors";

html,
body {
  height: 100%;
}
.main-container {
  height: 100%;
}
.el-header {
  background-color: $blue;
  color: #fff;
}
.el-aside {
  border-right: 1px solid $border;
}
.el-footer {
  border-top: 1px solid $border;
  text-align: center;
  color: $text-secondary;
}
</style>
