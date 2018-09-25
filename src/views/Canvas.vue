<template>
    <section>
        <img src="../assets/0007.jpg" id="img">
        <canvas width="914" height="1264" id="canvas"></canvas>
        <canvas width="914" height="1264" id="target"></canvas>
        <el-button type="primary" @click="getPoints">Get Points</el-button>
        <el-button type="primary" @click="getPointsOrigin">原始点位</el-button>
        <el-button type="primary" @click="drawToTarget">画画</el-button>
        <el-button type="primary" @click="drawOneByOne">一个个画</el-button>
    </section>
</template>

<script>
  export default {
    name: 'Canvas',
    data() {
      return {
        canvas: null,
        ctx: null,
        targetCanvas: null,
        count: 0,
        points: null,
        img: null,
        target: {"ptimg-version":1,"resources":{"i":{"src":"0007.jpg","width":914,"height":1264}},"views":[{"width":850,"height":1200,"coords":["i:4,4+107,150>529,150","i:119,4+107,150>422,0","i:234,4+101,150>749,300","i:343,4+107,150>208,1050","i:458,4+107,150>0,0","i:573,4+107,150>636,750","i:688,4+107,150>535,300","i:803,4+107,150>214,900","i:4,162+107,150>321,300","i:119,162+107,150>642,450","i:234,162+107,150>107,900","i:349,162+107,150>321,900","i:464,162+107,150>422,600","i:579,162+101,150>107,750","i:688,162+107,150>428,450","i:803,162+107,150>428,300","i:4,320+107,150>315,1050","i:119,320+107,150>743,900","i:234,320+107,150>0,750","i:349,320+107,150>636,0","i:464,320+107,150>214,450","i:579,320+107,150>107,300","i:694,320+101,150>0,1050","i:803,320+107,150>107,450","i:4,478+107,150>743,0","i:119,478+107,150>529,1050","i:234,478+107,150>529,0","i:349,478+107,150>101,1050","i:464,478+107,150>107,600","i:579,478+101,150>642,900","i:688,478+107,150>214,600","i:803,478+107,150>315,750","i:4,636+101,150>749,450","i:113,636+107,150>208,750","i:228,636+107,150>422,150","i:343,636+107,150>535,900","i:458,636+107,150>0,300","i:573,636+107,150>529,750","i:688,636+107,150>642,300","i:803,636+107,150>107,0","i:4,794+107,150>107,150","i:119,794+107,150>321,450","i:234,794+107,150>422,750","i:349,794+107,150>636,600","i:464,794+101,150>321,600","i:573,794+107,150>743,1050","i:688,794+107,150>743,600","i:803,794+107,150>0,150","i:4,952+107,150>0,900","i:119,952+107,150>743,150","i:234,952+107,150>636,150","i:349,952+107,150>214,0","i:464,952+107,150>535,450","i:579,952+107,150>636,1050","i:694,952+101,150>321,0","i:803,952+107,150>0,600","i:4,1110+107,150>0,450","i:119,1110+107,150>214,300","i:234,1110+107,150>214,150","i:349,1110+101,150>321,150","i:458,1110+107,150>428,900","i:573,1110+107,150>422,1050","i:688,1110+107,150>529,600","i:803,1110+107,150>743,750"]}]}
      };
    },
    mounted() {
      const canvas = document.getElementById('canvas');
      const target = document.getElementById('target');
      const context = canvas.getContext('2d');
      const img = document.getElementById('img');
      img.onload = () => {
        context.drawImage(img, 0, 0, 914, 1264, 0, 0, 914, 1264);
      };
      this.canvas = canvas;
      this.ctx = context;
      this.targetCanvas = target.getContext('2d');
      // console.log(img);
      console.log(this.getPointsInfo());
      this.points = this.getPointsInfo();
      this.img = img;
    },
    methods: {
      getPointsInfo() {
        const array = this.target.views[0].coords;
        const pointsStringArray = array.map((ele) => {
          const pointInfo = {};
          const str = ele.split(':')[1];
          const temp = str.split('+');
          const origin = temp[0];
          const originPoint = origin.split(',');
          pointInfo.originX = +originPoint[0];
          pointInfo.originY = +originPoint[1];
          const _temp = temp[1].split('>');
          const size = _temp[0].split(',');
          const targetPaint = _temp[1].split(',');
          pointInfo.width = +size[0];
          pointInfo.height = +size[1];
          pointInfo.targetX = +targetPaint[0];
          pointInfo.targetY = +targetPaint[1];
          return pointInfo;
        });
        return pointsStringArray;
      },
      drawToTarget() {
        const origin = this.ctx; // 源画布
        const ctx = this.targetCanvas;  // 目标画布
        const img = document.getElementById('img');
        const points = this.getPointsInfo();
        points.map((ele) => {
          ctx.drawImage(img, ele.originX, ele.originY, ele.width, ele.height, ele.targetX, ele.targetY, ele.width, ele.height);
        });
      },
      drawOneByOne() {
        const ctx = this.targetCanvas;  // 目标画布
        const ele = this.points[this.count];
        ctx.drawImage(this.img, ele.originX, ele.originY, ele.width, ele.height, ele.targetX, ele.targetY, ele.width, ele.height);
        this.count++
      },
      // 获取大于号后面的那一段坐标
      getPoints() {
        const array = this.target.views[0].coords;
        const pointsStringArray = array.map((ele) => {
          const str = (ele.split('>'))[1];
          const points = str.split(',');
          return [+points[0], +points[1]];
          // const str = ele.split(':')[1];
          // const origin
        });
        // console.log(pointsStringArray);
        this.drawPoints(pointsStringArray);
        // return pointsStringArray;
      },
      // 获取i后面的坐标试试
      getPointsOrigin() {
        const array = this.target.views[0].coords;
        const pointsStringArray = array.map((ele) => {
          const str = (ele.split('+'))[0];
          const temp = (str.split(':'))[1];
          const points = temp.split(',');
          return [+points[0], +points[1]];
        });
        this.drawPoints(pointsStringArray, true);
      },
      drawPoints(points, flag) {
        points.map((ele, index) => {
          this.drawDot(ele[0], ele[1], index, flag);
        });
      },
      drawDot(x, y, index, flag) {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x+3, y+3, 5, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.font = '20px serif';
        ctx.fillStyle = '#0b12ff';
        if (flag) {
          ctx.fillStyle = '#f00';
        }
        ctx.fill();
        if (flag) {
          ctx.fillText(index, x + 40, y + 30);
        } else {
          ctx.fillText(index, x + 20, y + 30);
        }
        ctx = null;
      }
    }
  };
</script>

<style scoped lang="scss">
    #canvas {
        /*background-color: #000;*/
        /*background: url("../assets/0001-l.png") no-repeat;*/
        /*background-size: cover;*/
        border: 1px solid red;
        display: none;
    }
    #img {
        display: none;
    }
    #target {
        vertical-align: top;
        border: 1px solid yellow;
    }
</style>