<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container">
        <SearchBar/>
      </div>
    </div>
    <div>
      <div style="padding-top: 5px;" class="row container bg-white">
        <div class="col-lg-6">
          <div class="slider">
            <img :src="detail.preview ? detail.preview[selected_preview].url :
            'https://image1.guazistatic.com/qn180618155102242081e88c459a11926744030df0971b.jpg?imageView2/1/w/287/h/192/q/88'"
                 alt="">
          </div>
          <div class="row thumbnail-list">
            <div :key="i" @click="selected_preview = i" v-for="(pre, i) in detail.preview" class="col-lg-3">
              <img :src="pre.url" alt="pre.name">
            </div>
          </div>
        </div>
        <div class="col-lg-6 order-panel">
          <h1 class="title">{{detail.title}}</h1>
          <div class="well">
            <div class="row">
              <div class="col-lg-3 prop">报价</div>
              <div class="col-lg-9">
                <span class="price currency">{{detail.price}}万</span>
                <span class="price currency">含税{{detail.price}}万</span>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 prop">服务费</div>
              <div class="col-lg-9">
                <span class="price currency">3000</span>
                <span class="help"></span>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 prop">服务项</div>
              <div class="col-lg-9">
                <span>整车质保</span>
                <span>14天可退</span>
                <span>249项车况检测</span>
              </div>
            </div>
          </div>
          <div class="short-props">
            <div class="dib">
              <div class="prop">上牌时间</div>
              <div class="value">{{detail.birth_day | only_day }}</div>
            </div>
            <div class="dib">
              <div class="prop">公里数</div>
              <div class="value">{{detail.consumed_distance || 0}}万公里</div>
            </div>
            <div class="dib">
              <div class="prop">外迁查询</div>
              <div class="value">国五</div>
            </div>
            <div class="dib">
              <div class="prop">排量</div>
              <div class="value">1.6L</div>
            </div>
          </div>
          <div class="action">
            <a class="btn btn-primary">预约看车</a>
            <span class="tel">400-080-5027</span>
          </div>
        </div>
      </div>
    </div>
    <div class="vehicle-detail bg-white">
      <div class="container">
        <h2>车辆详情</h2>
        <div class="row">
          <div class="col-lg-6">
            <div class="report-panel">
              <div class="title">排除重大事故检测</div>
              <div>
                <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'major_accident'"
                     v-for="(ok, key) in report" :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
                  <span v-if="ok" class="fa fa-check"></span>
                  <span v-else class="fa fa-minus"></span> {{conf.display_name}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="preview">
          <div class="title"></div>
          <div class="desc"></div>
          <div>
            <div class="col-lg-6">
              <div class="card">
                <img src="../assets/detail/preview-01.webp">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card">
                <img src="../assets/detail/preview-01.webp">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card">
                <img src="../assets/detail/preview-01.webp">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card">
                <img src="../assets/detail/preview-01.webp">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav       from '../component/Nav';
  import SearchBar from '../component/SearchBar';
  import api       from '../lib/api';

  export default {
    mounted () {
      let id = this.get_id();

      this.find(id);
      this.find_report_by_vehicle(id);
      this.get_report_structure();
    },
    data () {
      return {
        selected_preview : 0,
        detail           : {},
        report           : {},
        report_structure : {},
      };
    },
    methods    : {
      find (id) {
        api('vehicle/find', { id })
          .then(r => this.detail = r.data);
      },

      find_report_by_vehicle (vid) {
        api('report/first', {
          where : { vehicle_id : vid },
        }).then(r => {
          this.report = r.data;
        });
      },

      get_report_structure () {
        api('MODEL/FIND', { name : 'report' })
          .then(r => {
            this.report_structure = r.data.structure;
          });
      },

      get_id () {
        return this.$route.params.id;
      },
    },
    components : {
      Nav,
      SearchBar,
    },
  };
</script>
