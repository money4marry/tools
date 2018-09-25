<template>
    <section>
        <input type="file" ref="file" @change="handleUpload">
        <div class="video">
            <video id="mVideo" :src="videoSrc" controls width="320"></video>
        </div>

    </section>
</template>

<script>
  export default {
    name: 'Video',
    data() {
      return {
        videoSrc: ''
      };
    },
    mounted() {
      // this.$refs.file
      const mVideo = document.getElementById('mVideo');
      mVideo.onerror = function(e) {
        console.log(e)
      }
    },
    methods: {
      handleUpload(e) {
        console.log(e);
        this.videoSrc = URL.createObjectURL(e.target.files[0])
      }
    }
  };
</script>

<style scoped lang="scss">

</style>