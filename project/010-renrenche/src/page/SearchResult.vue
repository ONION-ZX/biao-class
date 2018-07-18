<template>
  <div>
    <Nav/>
    <div>
      <div class="container">
        <!-- <SearchBar v-if="show_form" :keyword="search_param.keyword" :onSubmit="on_submit"/> -->
      </div>
      <div class="container">
        <div class="filter-list">
          <div class="kill-space filter">
            <div class="col-lg-1 prop">品牌</div>
            <div class="col-lg-10 range">
              <span :class="{active: !search_param.brand_id}" @click="remove_condition('brand_id')">不限</span>
              <span :key="index" :class="{active: search_param.brand_id == row.id}" @click="set_where('brand_id', row.id)"
                     v-for="(row,index) in list.brand">{{row.name}}</span>
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
          <div class="kill-space filter">
            <div class="col-lg-1 prop">设计</div>
            <div class="col-lg-10 range">
              <span :class="{active: !search_param.design_id}" @click="remove_condition('design_id')">不限</span>
              <span :key="index" :class="{active: search_param.design_id == row.id}" @click="set_where('design_id', row.id)"
                    v-for="(row,index) in list.design">{{row.name}}</span>
            </div>
            <div class="col-lg-1 right others">
              <button>全部</button>
            </div>
          </div>
          <div class="kill-space filter">
            <div class="col-lg-1 prop" >价格</div>
            <div class="col-lg-10 range">
              <span :class="{active: !search_param.price_min && !search_param.price_max}"
                    @click="set_price_range(0, 0)">不限
              </span>
              <span :class="{active: search_param.price_min == 0 && search_param.price_max ==3}"
                    @click="set_price_range(0, 3)">3万以下
              </span>
              <span :class="{active: search_param.price_min == 3 && search_param.price_max ==5}"
                    @click="set_price_range(3, 5)">3-5
                万</span>
              <span :class="{active: search_param.price_min == 5  && search_param.price_max ==8}"
                    @click="set_price_range(5, 8)">5-8
                万</span>
              <span :class="{active: search_param.price_min == 8 && search_param.price_max ==10}"
                    @click="set_price_range(8, 10)">8-10
                万</span>
              <span :class="{active: search_param.price_min == 10 && search_param.price_max == 15}"
                    @click="set_price_range(10, 15)">10-15
                万</span>
              <span :class="{active: search_param.price_min == 15 && search_param.price_max == 20}"
                    @click="set_price_range(15, 20)">15-20
                万</span>
              <span :class="{active: search_param.price_min == 20 && search_param.price_max == 30}"
                    @click="set_price_range(20, 30)">20-30
                万</span>
              <span :class="{active: search_param.price_min == 30}"
                    @click="set_price_range(30, 0)">30
                万以上</span>
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
              <span class="anchor" @click="toggle_sort_by('id')">时间
                <i :class="{fas: true, 'fa-caret-up': is_sort('id', 'up'),
                        'fa-caret-down': is_sort('id', 'down')}"></i></span>
              <span class="anchor" @click="toggle_sort_by('price')">价格
                <i :class="{fas: true, 'fa-caret-up': is_sort('price', 'up'),'fa-caret-down': is_sort('price',
                        'down')}"></i></span>
              <span>车龄</span>
              <span>历程</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div v-if="result.length" class="row vehicle-list">
          <div :key="index" class="col-lg-3" v-for="(row,index) in result">
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
                  <a class="btn btn-primary buy">购买</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty-holder" v-else>暂无内容</div>     
      </div>
      <Pagination v-if="result.length" :show-form="true" :currentPage="search_param.page" :totalCount="total" :limit="limit" :onChange="on_page_change"/> 
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import '../css/vehicle-list.css';

  import Nav       from '../components/Nav.vue';
  import Footer       from '../components/Footer.vue';

  import SearchBar from '../components/SearchBar.vue';
  import Dropdown  from '../components/Dropdown.vue';
  import Pagination  from '../components/Pagination.vue';

  import VehicleList from '../mixins/VehicleList';
  import Reader from '../mixins/Reader';

  import api from '../lib/api';
  import { clone } from '../lib/helper';

  export default {
    components : { Nav, SearchBar, Dropdown ,Footer, Pagination },
    mixins: [ VehicleList , Reader],
    mounted() {
      this.prepare_search_param();
      this.search();
      this.read('brand');
      this.read('design');
    },
    data () {
      return {
        show_form: false,
        total: 0,
        limit: 3,
        list: {},
        result: [],
        search_param: {},
      };
    },
    methods: {
      on_page_change(page) {
        this.set_condition('page',page);
      },
      prepare_search_param () {
        let query         = this.parse_route_query();
        this.search_param = query;
      },
      is_sort(property, direction) {
        let p = this.search_param;
        if(!p.sort_by)
          return false;
        return p.sort_by[0] == property && p.sort_by[1] == direction;
      },
      parse_route_query () {
        let query = clone(this.$route.query); //?后面的内容
        if (!query.sort_by) {
           query.sort_by = ['id', 'down'];
        } else if(!Array.isArray(query.sort_by))
          query.sort_by = query.sort_by.split(',');
        return query;
      },
      toggle_sort_by(property) {
        let query = this.parse_route_query();
        let sort_prop = query.sort_by[0];
        let direction = query.sort_by[1];

        if(sort_prop == property) {
          query.sort_by[1] = direction == 'up' ? 'down' : 'up';
        } else {
          query.sort_by[0] = property;
          query.sort_by[1] = 'down';
        }
        query.sort_by = query.sort_by.toString();
        this.$router.replace({query});
      },
      set_price_range(min,max) {
        let query = Object.assign({}, this.$route.query);
        if(!min && !max) {
          delete query.price_min;
          delete query.price_max;
        } else {
          let condition = {
            price_min: min,
            price_max: max,
          };
          query = Object.assign({}, query, condition);
        };

        this.$router.replace({query});
      },
      set_condition(type, value) {
        let query = clone(this.$route.query);
        switch(type) {
          case 'sort_by':
            query.sort_by = value;
            break;
          case 'page':
            query.page = value;
            break;
        }
        this.$router.replace({query});
        this.search();
      },
      set_where(type, value) {
        let condition = {};
        condition[type] = value;

        let o = this.search_param;
        let n = Object.assign({}, o, condition);
        this.$router.replace({query: n});
      },
      remove_condition(type) {
        let query = Object.assign({}, this.$route.query);
        delete query[type];
        this.$router.replace({query});
      },
      // on_submit() {
      //   this.search();
      // },
      search () {
        let p = this.search_param;

        let brand_query     = ''
          , design_query    = ''
          , price_min_query = ''
          , price_max_query = ''
        ;

        p.brand_id && (brand_query = `and "brand_id" = ${p.brand_id}`);
        p.design_id && (design_query = `and "design_id" = ${p.design_id}`);
        p.price_min && (price_min_query = `and "price" >= ${p.price_min}`);
        p.price_max && (price_max_query = `and "price" <= ${p.price_max}`);

        let query =
              `where("title" contains "${p.keyword || ''}" ${brand_query} ${design_query} ${price_min_query} ${price_max_query})`;

        api('vehicle/read', { query : query, sort_by : p.sort_by, limit : 3, page: p.page, limit: this.limit })
          .then(r => {
            this.result = r.data;
            this.total = r.total;
          });
      },
    },
    watch: {
      '$route.query': {
        deep: true,
        handler() {
          this.prepare_search_param();
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
    background: rgba(0, 0, 0, .6);
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
