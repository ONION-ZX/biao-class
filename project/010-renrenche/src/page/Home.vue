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
              <router-link :key="index" :to="'/search?brand_id=' + row.id" v-for="(row,index) in list.brand" class="tag">{{row.name}}
              </router-link>
            </div>
            <div>
              <span class="tag">3万以下</span>
              <span class="tag">10万以下</span>
              <span class="tag">20万以下</span>
              <span class="tag">20万以下</span>
            </div>
            <div>
              <router-link :key="index" :to="'/search?design_id=' + row.id" v-for="(row,index) in list.design" class="tag">{{row.name}}
              </router-link>
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
              <img src="../assets/home/guarantee1.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="vehicle-nav">
        <div class="container">
          <div @click="read('on_sale')" class="item">特价好车</div>
          <div @click="read('under_5')" class="item">5万以下</div>
          <div @click="read('between_5_10')" class="item">5-10万</div>
          <div @click="read('suv')" class="item">超值SUV</div>
          <div @click="read('urgent')" class="item">急售降价车</div>
          <router-link to="/search-result" class="item">更多</router-link>
        </div>
      </div>
      <div class="vehicle-list">
        <div class="container">
          <div :key="i" class="col-lg-3" v-for="(row,i) in main_list">
            <div class="card">
              <div class="thumbnail">
                <img :src="get_thumbnail(row)">
              </div>
              <div class="detail">
                <div class="title">{{row.title}}</div>
                <div class="desc">2015年02月 / 3.07万公里</div>
                <div class="others">
                  <span class="price">{{row.price}}</span>
                  <span>首付3.5万</span>
                  <router-link :to="'/detail/' + row.id" class="btn btn-primary buy">购买</router-link>
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
import api from "../lib/api";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import VehicleList from '../mixins/VehicleList.vue';
import Reader      from '../mixins/Reader';

export default {
  components: { Nav, Footer },
  mixins: [ VehicleList, Reader],
  mounted() {
    this.read("on_sale");
    this.find_design("suv");
  },
  data() {
    return {
      list: {},
      design: {},
      main_list: [],
    };
  },
  methods: {
    find_design(name) {
      api("design/search", { or: { name } }).then(r => {
        this.design[name] = r.data[0];
      });
    },

    read(type) {
      let condition = {};
      switch (type) {
        case 'on_sale':
          condition = {
            where: {
              and: {
                on_sale: true,
              }
            },
          };
          break;
        case 'under_5':
          condition = {
            where: {
              and: [['price', '<', 5]],
            },
          };
          break;
        case 'between_5_10':
          condition = {
            where: {
              and: [
                ['price', '<', 10],
              ['price', '>', 5],
              ],
            }
          };
          break;
        case 'suv':
          condition = {
            where: {
              and: {
                design_id: this.design.suv.id,
              }
            }
          }
          break;
        case 'urgent':
        let date = new Date;
        date.setDate(date.getDate() + 3);
        date = date.toISOString().split('T')[0];
         condition = {query: `where("deadline" <= "${date}")`};
          break;
      }

      api('vehicle/read', condition)
        .then(r => {
          this["main_list"] = r.data;
        });
    },
  },
};
</script>

<style scoped>
.slider img {
  padding-left: 10px;
  padding-right: 10px;
  height: 500px;
}

.query-area {
  padding: 15px;
  background: #fff;
}

.tag {
  display: inline-block;
  font-size: 0.7rem;
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
  font-size: 0.7rem;
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
  font-size: 0.8rem;
}

.vehicle-list .card .desc,
.vehicle-list .card .others {
  font-size: 0.6rem;
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
  font-size: 0.8rem;
  padding-left: 25px;
  padding-right: 25px;
}
</style>
