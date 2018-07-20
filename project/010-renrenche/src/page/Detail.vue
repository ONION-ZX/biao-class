<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container">
        <SearchBar v-if="show_form=false"/>
      </div>
    </div>
    <div>
      <div style="padding-top: 5px; padding-bottom: 5px;" class="row container bg-white">
        <div class="col-lg-6">
          <div class="slider">
            <!-- row.preview && row.preview[ 0 ] && row.preview[ 0 ].url ?
             row.preview[ 0 ].url :
              'https://image1.guazistatic.com/qn180618155102242081e88c459a11926744030df0971b.jpg?imageView2/1/w/287/h/192/q/88' -->
            <img :src="detail.preview && detail.preview[selected_preview] && detail.preview[selected_preview].url ? detail.preview[selected_preview].url :
            'https://image1.guazistatic.com/qn180618155102242081e88c459a11926744030df0971b.jpg?imageView2/1/w/287/h/192/q/88'" alt="detail.preview[selected_preview].name">
          </div>
          <div class="row thumbnail-list">"
            <div :key="i" @mouseover="selected_preview = i" v-for="(pre, i) in detail.preview" class="col-lg-4">
              <img :src="pre.url" alt="pre.name">
             </div>
          </div>
        </div>
        <div class="col-lg-6 order-panel">
          <div class="well">
          <h1 class="title">{{detail.title}}</h1>
            <div class="row">
              <div class="col-lg-1 prop">报价</div>
              <div class="col-lg-9">
                <span class="vehicle-price currency">{{detail.price}}<span class="degree">万</span></span>
                <span class="price currency">含税9.5<span>万</span></span>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-1 prop">服务费</div>
              <div class="col-lg-9">
                <span class="price currency">3000</span>
                <span class="help"></span>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-1 prop">服务项</div>
              <div class="col-lg-9">
                <span>整车质保 </span>
                <span>14天可退 </span>
                <span>249项车况检测 </span>
              </div>
            </div>
            <div class="short-props">
              <div class="dib">
                <div class="prop">上牌时间</div>
                <div class="value">{{(detail.birth_day|| '暂无') |only_day}}</div>
              </div>
              <div class="dib">
                <div class="prop">公里数</div>
                <div class="value">{{detail.consumed_distance || 0 }}</div>
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
            <div v-if="!appointment" class="action">
              <div v-if="!show_appo">
                <button @click="show_appo=true" class="btn btn-primary">预约看车</button>
                &nbsp;<span class="tel">400-080-5027</span>
              </div>
              <form v-if="show_appo" @submit="submit_appo">
                <div class="input-control">
                  <label for="appointed_at">预约时间</label>
                  <input v-validator="'required'" id="appointed_at" type="date" v-model="appo.appointed_at">
                </div>
                <div class="input-control btn-group">
                  <button type="submit" class="btn-primary">预约</button>
                  <button type="button" @click="show_appo=false">取消</button>
                </div>
              </form>
            </div>
            <div class="appointed" v-else>
              <button class="btn btn-primary" type="button">已预约</button>
              <span class="appointed_at">
                预约时间：{{appointment.appointed_at}}
              </span>
            </div>
        </div>
      </div>
    </div>
    </div>
    <div class="vehicle-detail bg-white">
      <div class="container">
        <h2>车辆详情</h2>
        <div class="row main">
          <div class="col-lg-12">
            <ReportPanel title="排除重大事故检测"
                         cat="major_accident"
                         :reportStructure="report_structure"
                         :report="report"/>
            <!-- <div class="report-panel">
              <div class="title">排除重大事故检测</div>
              <div>
                <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'major_accident'"
                     v-for="(ok, key) in report" :class="'col-lg-4 report-item ' ( !ok ? 'muted' : '')">
                  <span v-if="ok"><i class="far fa-smile"></i></span>
                  <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
             <ReportPanel title="泡水火烧检测"
                         cat="soaking_and_roasting"
                         :reportStructure="report_structure"
                         :report="report"/>
          </div>
        </div>
        <div class="row">
         <div class="col-lg-12">
           <ReportPanel title="轻微碰撞检测"
                         cat="minor_crash"
                         :reportStructure="report_structure"
                         :report="report"/>
        </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
           <ReportPanel title="易损耗部件检测"
                         cat="consumable"
                         :reportStructure="report_structure"
                         :report="report"/>
         </div>
        </div>
        
      </div>
    </div>   
    </div>
</template>

<script>
  import Nav       from '../components/Nav';
  import SearchBar from '../components/SearchBar';
  import ReportPanel from '../components/ReportPanel';
  import validator from '../directive/validator.js';  

  import api       from '../lib/api';
  import session       from '../lib/session';




  export default {
    mounted() {
      let id = this.get_id();
      this.find(id);
      this.find_report_by_vehicle(id);
      this.get_report_structure();
      this.prepare_appo_row();
      this.has_appointed();
    },
    components : { Nav, SearchBar, ReportPanel },
    data() {
      return {
        show_appo: false,
        appointment: {},
        appo: {},
        selected_preview: 0,
        detail: {},
        report: {},
        report_structure: {},
      };
    },
    methods: {
      submit_appo(e) {
        e.preventDefault();
        api('order/create',this.appo)
         .then(() => {
           this.has_appointed();
         });
      },
      has_appointed () {
       let row   = this.appo;
       let query = `where("vehicle_id" = ${row.vehicle_id} and "user_id" = ${row.user_id})`;
       api('order/read', { query })
         .then(r => {
           this.appointment = r.data[ 0 ];
         });
     },

      prepare_appo_row() {
        this.appo.vehicle_id = this.get_id();
        this.appo.user_id = session.uinfo().id || '';
      },
      get_id() {
        return this.$route.params.id;
      },
      find(id) {
        api('vehicle/find',{id})
          .then(r => {
            this.detail = r.data;
          });
      },
      find_report_by_vehicle(vehicle_id) {
        api('report/first',{
          where: {
            vehicle_id,
          }
        }).then(r => {
          this.report = r.data;
        })
      },
      get_report_structure() {
        api('MODEL/FIND',{name: 'report'})
          .then(r => {
            this.report_structure = r.data.structure;
          })
      }
    }
  };
</script>

<style scoped>
  h2 {
    margin: 0;
    padding: 10px 0;
    text-align: center;
    font-weight: normal;
    border: 1px solid rgba(0,0,0,.5);
  }


  .sub-title {
    padding: 10px 0;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 10px;
  }

  .order-panel {
    height: 400px;
    background:rgba(0,0,0,.1);
  }

  .slider {
    height: 400px;
  }

  .well {
    position: relative;
    left: 40px;
    top: 27px;
  }

  .well .prop {
    font-size: .9rem;
    color: #666;
  }

  .well > .row {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .short-props {
    margin-top: 20px;
  }

  .short-props .dib {
    padding: 5px;
    display: inline-block;
    width: 20%;
    margin-top: 10px;
  }


  .short-props > .dib .value {
    text-align: center;
    font-size: 14px;
    padding: 10px;
  }

  .short-props .prop {
    text-align: center;
    color: #888;
  }

  .action {
    padding: 20px;
    padding-left: 5px;
  }

  .action > * {
    margin-right: 10px;
  }

  .thumbnail-list {
    overflow: auto;
    white-space: nowrap;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .vehicle-detail {
    margin-top: 10px;
  }

  .vehicle-detail .container > .row {
    margin-bottom: 10px;
  }

  .dashed {
    margin-top: 10px;
    border-right: 1px dashed #ddd;
  }

  .card img {
    padding: 10px;
  }

 .vehicle-price {
   font-size: 25px;
 }

 .price span,
 .degree {
   font-size: 10px;
   padding-right: 5px;
 }

 .col-lg-1.prop,
 .col-lg-9 {
   vertical-align: middle;
 } 

 .col-lg-9 {
   padding-left: 20px;
 }

 .appointed {
   margin-top: 20px;
 }

 .appointed_at {
   margin-left: 15px;
   font-size: 14px;
 }

 .btn-primary {
   font-size: 15px;
 }

</style>
