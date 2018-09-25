<template>
    <section class="main">
        <img src="../assets/new.jpg" alt="" id="img">
        <img src="../assets/compare.jpg" alt="" id="img2">
        <div id="content" class="clearfix" @dragstart="handleDrag" @dragover="handleDragover" @drop="handleDrop"></div>
        <div id="target" @dragover="handleDragover" @dragstart="handleDrag" @drop="handleDrop">
            <!--<canvas id="targetCanvas" width="460" height="640" style="background-color: #000;"></canvas>-->
        </div>
        <div id="compare">
            <canvas id="compareCanvas"></canvas>
        </div>
    </section>
</template>

<script>
  export default {
    name: 'Puzzle',
    data() {
      return {
        tempSrcCanvas: null, // 保存拖动时的源canvas
      };
    },
    mounted() {
      const img = document.getElementById('img');
      img.onload = () => {
        this.splitImg(img);
      };
      const img2 = document.getElementById('img2');
      img2.onload = () => {
        this.drawCompare(img2);
      };

      // const canvas = document.getElementById('targetCanvas');
      // const context = canvas.getContext('2d');
      // this.setCoords(context);
      this.setTargetCanvas();
    },
    methods: {
      drawCompare(img) {
        const width = 143;
        const height = 200;
        const canvas = document.getElementById('compareCanvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 460;
        canvas.height = 640;
        ctx.drawImage(img, 0, 0, 596, 848, 0, 0, 460, 640);
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        for (let i = 1; i < 8; i++) {
//          for (let j = 1; j < 8; j++) {
            ctx.moveTo(i*57.2, 0);
            ctx.lineTo(i*57.2, 640);
            ctx.stroke();
            ctx.moveTo(0, i*80);
            ctx.lineTo(460, i*80);
            ctx.stroke();
//          }
        }
      },
      splitImg(img) {
        const width = 143;
        const height = 200;
        for (let i = 0; i < 8; i++) {
          let y = i * height; // 左上角的y坐标  eg 第一排全为0

          for (let j = 0; j < 8; j++) {
            let x = j * width; // 左上角的x坐标  eg 第一排每个块都会增加一个width
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const innerWidth = canvas.width = 57.2;
            const innerHeight = canvas.height = 80;
            canvas.style.position = 'absolute';
            canvas.style.top = `${i * innerHeight}px`;
            canvas.style.left = `${j * innerWidth}px`;
            canvas.style.backgroundColor = '#f00';
            canvas.setAttribute('draggable', true);
            canvas.setAttribute('data-y', y);
            canvas.setAttribute('data-x', x);

            ctx.scale(0.4, 0.4);
            ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
            const parent = document.getElementById('content');
            parent.appendChild(canvas);
          }
        }
      },
      handleDrag(ev) {
        console.log(ev);
        // ev.dataTransfer.setData('img', ev.target);
        ev.dataTransfer.setData('x', ev.target.dataset.x);
        ev.dataTransfer.setData('y', ev.target.dataset.y);
        const _src = ev.target;
        const _ctx = _src.getContext('2d');
        this.tempSrcCanvas = _ctx;
      },
      handleDragover(ev) {
        // console.log(ev);
        ev.preventDefault();
      },
      handleDrop(ev) {
        const img = document.getElementById('img');
        console.log(ev);
        // const src = ev.dataTransfer.getData('img');
        const x = ev.dataTransfer.getData('x');
        const y = ev.dataTransfer.getData('y');
        // console.log(src);
        const _target = ev.target;
        let ctx = _target.getContext('2d');
        ctx.drawImage(img, x, y, 143, 200, 0, 0, 57.2, 80);
        ctx.scale(0.4, 0.4);
        ctx = null;

        this.tempSrcCanvas.clearRect(0, 0, 143, 200);

      },
      // 设置坐标点
      setCoords(ctx) {
        const width = 57.2;
        const height = 80;
        for (let i = 0; i < 8; i++) {
          let y = i * height; // 左上角的y坐标  eg 第一排全为0

          for (let j = 0; j < 8; j++) {
            let x = j * width; // 左上角的x坐标  eg 第一排每个块都会增加一个width
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = '#fff';
            ctx.fill();
          }
        }
      },
      setTargetCanvas() {
        const width = 57.2;
        const height = 80;
        for (let i = 0; i < 8; i++) {
          let y = i * height; // 左上角的y坐标  eg 第一排全为0

          for (let j = 0; j < 8; j++) {
            let x = j * width; // 左上角的x坐标  eg 第一排每个块都会增加一个width
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            canvas.style.backgroundColor = '#000';
            canvas.style.position = 'absolute';
            canvas.style.top = `${y}px`;
            canvas.style.left = `${x}px`;
            canvas.setAttribute('draggable', true);
            canvas.setAttribute('data-index', `${i}${j}`);

            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(1, 1, 55, 78);
            ctx.closePath();
            ctx.stroke();
            const parent = document.getElementById('target');
            parent.appendChild(canvas);
          }
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    #img, #img2 {
        display: none;
    }
    #content {
        position: relative;
        width: 460px;
        height: 460px;
        border: 1px solid blue;
    }
    #target {
        position: relative;
        width: 460px;
        height: 640px;
        margin-left: 20px;
        border: 1px solid red;
    }
    #compare {
        display: inline-block;
        width: 460px;
        height: 640px;
        margin-left: 20px;
        border:1px solid yellow;
    }
    .main {
        display: flex;
    }
    canvas {
        position: absolute;
    }
    .clearfix::after {
        content: '.';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>