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
        <canvas id="test" width="1144" height="1600"></canvas>
        <el-button @click="test">花一块</el-button>
        <!--<p>{{jsonStr}}</p>-->
    </section>
</template>

<script>
  export default {
    name: 'Puzzle',
    data() {
      return {
        tempSrcCanvas: null, // 保存拖动时的源canvas
        jsonStr: [],
        count: 0,
        testJson: [
          {'src': '5', 'target': '57'}, {'src': '8', 'target': '49'}, {'src': '32', 'target': '25'},
          {'src': '28', 'target': '56'}, {'src': '27', 'target': '59'}, {'src': '30', 'target': '14'},
          {'src': '12', 'target': '22'},
          {'src': '43', 'target': '48'}, {'src': '47', 'target': '38'}, {'src': '48', 'target': '30'}, {
            'src': '53',
            'target': '40'
          }, {'src': '38', 'target': '41'}, {'src': '56', 'target': '46'}, {'src': '44', 'target': '45'}, {
            'src': '31',
            'target': '44'
          }, {'src': '63', 'target': '21'}, {'src': '21', 'target': '33'}, {'src': '11', 'target': '34'}, {
            'src': '23',
            'target': '35'
          }, {'src': '2', 'target': '36'}, {'src': '25', 'target': '43'}, {'src': '61', 'target': '53'}, {
            'src': '52',
            'target': '17'
          }, {'src': '50', 'target': '13'}, {'src': '36', 'target': '27'}, {'src': '35', 'target': '18'}, {
            'src': '51',
            'target': '19'
          }, {'src': '10', 'target': '28'}, {'src': '18', 'target': '20'}, {'src': '62', 'target': '58'}, {
            'src': '41',
            'target': '52'
          }, {'src': '17', 'target': '51'}, {'src': '39', 'target': '50'}, {'src': '46', 'target': '60'}, {
            'src': '14',
            'target': '26'
          }, {'src': '15', 'target': '54'}, {'src': '60', 'target': '61'}, {'src': '59', 'target': '42'}, {
            'src': '22',
            'target': '16'
          }, {'src': '26', 'target': '31'}, {'src': '7', 'target': '63'}, {'src': '6', 'target': '62'}, {
            'src': '16',
            'target': '37'
          }, {'src': '4', 'target': '55'}, {'src': '33', 'target': '29'}, {'src': '40', 'target': '15'}, {
            'src': '3',
            'target': '23'
          }, {'src': '49', 'target': '39'}, {'src': '1', 'target': '47'}, {'src': '42', 'target': '12'}, {
            'src': '19',
            'target': '11'
          }, {'src': '54', 'target': '10'}, {'src': '57', 'target': '4'}, {'src': '13', 'target': '2'}, {
            'src': '55',
            'target': '7'
          }, {'src': '34', 'target': '6'}, {'src': '37', 'target': '9'}, {'src': '20', 'target': '8'}, {
            'src': '9',
            'target': '24'
          }, {'src': '58', 'target': '32'}, {'src': '24', 'target': '0'}, {'src': '29', 'target': '1'}, {
            'src': '45',
            'target': '3'
          }, {'src': '0', 'target': '5'}]
      };
    },
    mounted() {
      const img = document.getElementById('img');
      img.onload = () => {
        this.splitImg(img);
        this.drawTest(img);
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
      test() {
        const width = 143;
        const height = 200;
        const img = document.getElementById('img');
        const coords = this.testJson[this.count];
        console.log('坐标: ', JSON.stringify(coords));
        const src = +coords.src;
        const srcX = Math.floor(src % 8) * width;
        const srcY = Math.floor(src / 8) * height;
        const target = +coords.target;
        const targetX = Math.floor(target % 8) * width;
        const targetY = Math.floor(target / 8) * height;
        console.log('像素: ', `${srcX}-${srcY}`);
        console.log('像素: ', `${targetX}-${targetY}`);
        const testCanvas = document.getElementById('test');
        const context = testCanvas.getContext('2d');
        context.drawImage(img, srcX, srcY, width, height, targetX, targetY, width, height);
        this.count++;
      },
      drawTest(img) {
        const imgs = this.testJson;
        const array = [];
        const width = 143;
        const height = 200;
        const testCanvas = document.getElementById('test');
        const context = testCanvas.getContext('2d');
        imgs.map((ele, index) => {
//          const canvas = document.createElement('canvas');
//          const ctx = canvas.getContext('2d');
//          canvas.width = 143;
//          canvas.height = 200;
//          ctx.draw
//          if (index < 49) {
//            return
//          }
//           if (ele.target != '49' || ele.target != '50' || ele.target != '57' || ele.target != '58') {
//             return
//           }
          const src = +ele.src;
          const srcX = Math.floor(src % 8) * width;
          const srcY = Math.floor(src / 8) * height;
          const target = +ele.target;
          const targetX = Math.floor(target % 8) * width;
          const targetY = Math.floor(target / 8) * height;
          console.log(srcX, srcY);
          console.log(targetX, targetY);
          // setTimeout(() => {
            context.drawImage(img, srcX, srcY, width, height, targetX, targetY, width, height);
          // }, 1000);
        });
      },
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
          ctx.moveTo(i * 57.2, 0);
          ctx.lineTo(i * 57.2, 640);
          ctx.stroke();
          ctx.moveTo(0, i * 80);
          ctx.lineTo(460, i * 80);
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
            canvas.setAttribute('data-index', i * 8 + j);

            ctx.scale(0.4, 0.4);
            ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
            const parent = document.getElementById('content');
            parent.appendChild(canvas);
          }
        }
      },
      handleDrag(ev) {
//        console.log(ev);
        // ev.dataTransfer.setData('img', ev.target);
        ev.dataTransfer.setData('x', ev.target.dataset.x);
        ev.dataTransfer.setData('y', ev.target.dataset.y);
        ev.dataTransfer.setData('index', ev.target.dataset.index);
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
//        console.log(ev);
        // const src = ev.dataTransfer.getData('img');
        const x = ev.dataTransfer.getData('x');
        const y = ev.dataTransfer.getData('y');
        const index = ev.dataTransfer.getData('index');
        // console.log(src);
        const _target = ev.target;
        let ctx = _target.getContext('2d');
        ctx.drawImage(img, x, y, 143, 200, 0, 0, 57.2, 80);
        ctx.scale(0.4, 0.4);
        ctx = null;

        this.tempSrcCanvas.clearRect(0, 0, 143, 200);
        console.log('src', index);
        console.log('target', _target.dataset.target_index);
        this.jsonStr.push({
          src: index,
          target: _target.dataset.target_index
        });
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
            canvas.setAttribute('data-target_index', i * 8 + j);

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
        /*display: none;*/
    }

    #target {
        position: relative;
        width: 460px;
        height: 640px;
        margin-left: 20px;
        border: 1px solid red;
        /*display: none;*/
    }

    #compare {
        display: inline-block;
        width: 460px;
        height: 640px;
        margin-left: 20px;
        border: 1px solid yellow;
        /*display: none;*/
    }

    .main {
        display: flex;
    }

    canvas {
        position: absolute;
    }
    #test{
        margin-top: 645px;
    }

    .clearfix::after {
        content: '.';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>