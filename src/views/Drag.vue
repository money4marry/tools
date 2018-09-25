<template>
    <section>
        <draggable v-model="tags">
            <transition-group>
                <div class="tag" v-for="item in tags" :key="item.id">{{ item.name }}</div>
            </transition-group>
        </draggable>
    </section>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    name: 'Drag',
    components: {
      draggable
    },
    data() {
      return {
        tags: [
          {
            id: 1,
            name: 'Frank'
          },
          {
            id: 2,
            name: 'Anny'
          },
          {
            id: 3,
            name: 'Ben'
          }
        ]
      };
    }
  };
</script>

<style scoped lang="scss">
    .tag {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        background-color: #000;
        color: #fff;
        margin: 0 5px;
        padding: 0 5px;
        cursor: move;
    }
</style>
