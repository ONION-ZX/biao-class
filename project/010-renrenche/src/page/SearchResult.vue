<template>
  <div>
    <Nav/>
    <div>
      <div class="container">
        <SearchBar :onSubmit="on_submit"/>
      </div>
      <div class="container">
        <div class="filter-list">
          <div class="kill-space filter">
            <div class="col-lg-1 prop">品牌</div>
            <div class="col-lg-10 range">
              <span>不限</span>
              <span>大众</span>
              <span>福特</span>
              <span>奔驰</span>
              <span>现代</span>
              <span>大众</span>
              <span>福特</span>
              <span>奔驰</span>
              <span>现代</span>
              <span>大众</span>
              <span>福特</span>
              <span>奔驰</span>
              <span>现代</span>
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
          <div class="kill-space filter">
            <div class="col-lg-1 prop">车系</div>
            <div class="col-lg-10 range">
              <span>不限</span>
              <span>朗逸</span>
              <span>奔特</span>
              <span>福驰</span>
              <span>大代</span>
              <span>现众</span>
              <span>朗逸</span>
              <span>奔特</span>
              <span>福驰</span>
              <span>大代</span>
              <span>现众</span>
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
          <div class="kill-space filter">
            <div class="col-lg-1 prop">价格</div>
            <div class="col-lg-10 range">
              <span class="active">3万以下</span>
              <span>3-5万</span>
              <span>5-8万</span>
              <span>8-10万</span>
              <span>10-15万</span>
              <span>15-20万</span>
              <span>20-30万</span>
              <span>30万以上</span>
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
          <div class="kill-space filter">
            <div class="col-lg-1 prop">更多</div>
            <div class="col-lg-10 range">
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
        </div>
        <div class="filter-list">
          <div class="filter">
            <div class="range">
              <span>默认排序</span>
              <span>最新发布</span>
              <span>价格 ^</span>
              <span>车龄 v</span>
              <span>历程 v</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row vehicle-list">
          <div :key="index" class="col-lg-3" v-for="(row,index) in result">
            <div class="card">
              <div class="thumbnail">
                <img :src="get_thumbnail(row)">
              </div>
              <div class="detail">
                <div class="title">大众-高尔夫 2014款 1.6L 自动舒适型</div>
                <div class="desc">2015年02月 / 3.07万公里</div>
                <div class="others">
                  <span class="price">11.5万</span>
                  <span>首付3.5万</span>
                  <a class="btn btn-primary buy">购买</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../css/vehicle-list.css';

  import Nav       from '../components/Nav.vue';
  import Footer       from '../components/Footer.vue';

  import SearchBar from '../components/SearchBar.vue';
  import Dropdown  from '../components/Dropdown.vue';
  import VehicleList from '../mixins/VehicleList';

  import api from '../lib/api';

  export default {
    components : { Nav, SearchBar, Dropdown ,Footer },
    mixins: [ VehicleList ],
    mounted() {
      this.search_param = this.$route.query;
      this.search();
    },
    data () {
      return {
        result: [],
        search_param: {},
      };
    },
    methods: {
      on_submit() {
        this.search();
      },
      search() {
        api('vehicle/search', {
          or: {
            title: this.search_param.keyword,
          }
        }).then(r => {
          this.result = r.data;
        });
      }
    },
    watch: {
      'route.$query': {
        deep: true,
        handler(n) {
          this.search_param = n;
          this.search();
        }
      }
    }
  };
</script>

<style scoped>
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

  .filter-list {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .1);
    margin-bottom: 5px;
    /*padding: 5px;*/
  }

  .filter {
    border-top: 1px solid rgba(0, 0, 0, .1);
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .filter:first-child {
    border-top: 0;
  }

  .filter > * {
    vertical-align: middle;
  }

  .filter .prop,
  .filter .range > * {
    padding: 5px 10px;
  }

  .filter .range > * {
    margin-right: 2px;
  }

  .filter .range > .active {
    background: #fd521d;
    color: #fff;
  }

  .filter .others button {
    background: transparent;
    border: 0;
  }

  .filter .others button,
  .filter .dropdown {
    padding: 2px 5px;
  }
</style>
