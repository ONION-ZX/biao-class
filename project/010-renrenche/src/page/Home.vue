<template>
  <div>
    <Nav/>
    <div class="slider">
        <img src="../assets/home/slider2.jpg">
      <!--<div class="short-cuts">-->
      <!--<a href="#">Item</a>-->
      <!--<a href="#">Item</a>-->
      <!--<a href="#">Item</a>-->
      <!--<a href="#">Item</a>-->
      <!--</div>-->
    </div>
    <div class="query-area">
      <div class="container">
        <div class="row col-lg-8">
          <div class="col-lg-3 huge-text">买</div>
          <div class="col-lg-9">
            <div>
              <span class="tag">大众</span>
              <span class="tag">别克</span>
              <span class="tag">雪佛兰</span>
              <span class="tag">福特</span>
              <span class="tag">五菱</span>
              <span class="tag">大众</span>
              <span class="tag">别克</span>
              <span class="tag">雪佛兰</span>
              <span class="tag">福特</span>
              <span class="tag">五菱</span>
            </div>
            <div>
              <span class="tag">3万以下</span>
              <span class="tag">10万以下</span>
              <span class="tag">20万以下</span>
              <span class="tag">20万以下</span>
            </div>
            <div>
              <span class="tag">大众</span>
              <span class="tag">别克</span>
              <span class="tag">雪佛兰</span>
              <span class="tag">福特</span>
              <span class="tag">五菱</span>
            </div>
          </div>
        </div>
        <div class="row col-lg-4">
          <div class="col-lg-3 huge-text">卖</div>
          <div class="col-lg-9 right">
            <a style="margin-top: 15px; display: inline-block;" class="btn btn-dark btn-fat">极速卖车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="guarantee">
      <div class="row container">
        <div class="col-lg-3">
          <div class="card">
            <div>
              <div class="title">分期购车</div>
              <div class="desc">门槛低 审批快</div>
            </div>
            <div>
              <img src="../assets/home/guarantee1.png" alt="">
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card">
            <div>
              <div class="title">分期购车</div>
              <div class="desc">门槛低 审批快</div>
            </div>
            <div>
              <img src="../assets/home/guarantee1.png" alt="">
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card">
            <div>
              <div class="title">分期购车</div>
              <div class="desc">门槛低 审批快</div>
            </div>
            <div>
              <img src="../assets/home/guarantee1.png" alt="">
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card">
            <div>
              <div class="title">分期购车</div>
              <div class="desc">门槛低 审批快</div>
            </div>
            <div>
              <img src="../assets/home/guarantee1.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="vehicle-nav">
        <div class="container">
          <div class="item">特价好车</div>
          <div class="item">5万以下</div>
          <div class="item">5-10万</div>
          <div class="item">超值SUV</div>
          <div class="item">急售降价车</div>
          <div class="item">更多</div>
        </div>
      </div>
      <div class="vehicle-list">
        <div class="container">
          <div :key="i" class="col-lg-3" v-for="(row,i) in main_list">
            <div class="card">
              <div class="thumbnail">
                <img :src="row.preview ? row.preview[0].url : 'https://image1.guazistatic.com/qn180618155102242081e88c459a11926744030df0971b.jpg?imageView2/1/w/287/h/192/q/88'">              
              </div>
              <div class="detail">
                <div class="title">{{row.title}}</div>
                <div class="desc">2015年02月 / 3.07万公里</div>
                <div class="others">
                  <span class="price">{{row.price}}</span>
                  <span>首付3.5万</span>
                  <a class="btn btn-dark buy">购买</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Nav from '../components/Nav.vue';
  import Footer from '../components/Footer.vue';
  import api from '../lib/api';

  export default {
    mounted() {
      this.read('main');
    },
    data() {
      return {
        main_list: [],
      };
    },
    methods: {
      read(type) {
        api('vehicle/read')
          .then(r => {
            this[type +'_list'] = r.data;
          });
      }
    },
    components : { Nav, Footer },
  };
</script>

<style scoped>
  .slider img { 
    padding-left:10px;
    padding-right: 10px;
    height: 500px;
  }

  /* .btn {
    color: #fff !important;
  } */

  .query-area {
    padding: 15px;
    background: #fff;
  }

  .tag {
    display: inline-block;
    font-size: .7rem;
    padding: 5px;
    cursor: pointer;
  }

  .huge-text {
    position: relative;
    top: 5px;
    left: 20px;
  }

  .guarantee .col-lg-3 {
    padding: 20px;
  }

  .guarantee .card {
    padding: 15px;
    background: #fff;
  }

  .guarantee .title {
    margin-bottom: 10px;
  }

  .guarantee .desc {
    font-size: .7rem;
    color: #999;
  }

  .vehicle-nav .item {
    display: inline-block;
    width: 16.66666666666%;
    text-align: center;
    background: #fff;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-left-width: 0;
  }

  .vehicle-nav .item:first-child {
    border-left-width: 1px;
  }

  .vehicle-list .col-lg-3 {
    padding: 10px;
  }

  .vehicle-list .card {
    background: #fff;
  }

  .vehicle-list .card .detail {
    padding: 10px;
  }

  .vehicle-list .detail > * {
    margin-bottom: 5px;
  }

  .vehicle-list .card .title {
    font-size: .8rem;
  }

  .vehicle-list .card .desc,
  .vehicle-list .card .others {
    font-size: .6rem;
    color: #888;
  }

  .vehicle-list .card .price {
    color: #444;
    font-size: 1.3rem;
  }

  .vehicle-list .card {
    position: relative;
  }

  .vehicle-list .card .buy {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: .8rem;
    padding-left: 25px;
    padding-right: 25px;
  }

</style>
