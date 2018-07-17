<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container">
        <SearchBar v-if="show_form=false"/>
      </div>
    </div>
    <div>
      <div style="padding-top: 5px;" class="row container bg-white">
        <div class="col-lg-6">
          <div class="slider">
            <!-- row.preview && row.preview[ 0 ] && row.preview[ 0 ].url ?
             row.preview[ 0 ].url :
              'https://image1.guazistatic.com/qn180618155102242081e88c459a11926744030df0971b.jpg?imageView2/1/w/287/h/192/q/88' -->
            <img :src="detail.preview && detail.preview[selected_preview] && detail.preview[selected_preview].url ? detail.preview[selected_preview].url :
            'https://image1.guazistatic.com/qn180618155102242081e88c459a11926744030df0971b.jpg?imageView2/1/w/287/h/192/q/88'" alt="detail.preview[selected_preview].name">
          </div>
          <div class="row thumbnail-list">"
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
                <span class="price currency">含税9.5万</span>
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
                <span>整车质保 </span>
                <span>14天可退 </span>
                <span>249项车况检测 </span>
              </div>
            </div>
            <div class="short-props">
            <div class="dib">
              <div class="prop">上牌时间</div>
              <div class="value">{{detail.birth_day | only_day}}</div>
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
                  <span v-if="ok"><i class="far fa-smile"></i></span>
                  <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="report-panel">
              <div class="title">泡水火烧检测</div>
              <div>
                <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'soaking_and_roasting'"
                     v-for="(ok, key) in report" :class="'col-lg-5 report-item ' + ( !ok ? 'muted' : '')">
                  <span v-if="ok"><i class="far fa-smile"></i></span>
                  <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
         <div class="col-lg-12">
           <div class="report-panel">
             <div class="title">轻微碰撞检测</div>
             <div>
               <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'minor_crash'"
                    v-for="(ok, key) in report" :class="'col-lg-3 report-item ' + ( !ok ? 'muted' : '')">
                 <span v-if="ok"><i class="far fa-smile"></i></span>
                 <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}
               </div>
             </div>
           </div>
         </div>
         <div class="col-lg-12">
           <div class="report-panel">
             <div class="title">易损耗部件检测</div>
             <div>
               <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'consumable'"
                    v-for="(ok, key) in report" :class="'col-lg-3 report-item ' + ( !ok ? 'muted' : '')">
                 <span v-if="ok"><i class="far fa-smile"></i></span>
                 <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="row">
         <div class="col-lg-6">
           <div class="report-panel">
              <div class="title">安全系统检测</div>
              <div>
                <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'security_system'"
                     v-for="(ok, key) in report" :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
                <span v-if="ok"><i class="far fa-smile"></i></span>
                <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}  
                </div>
              </div>
            </div>
         </div>
         <div class="col-lg-6">
           <div class="report-panel">
              <div class="title">内部配置检测</div>
              <div>
                <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'inner_peripheral'"
                     v-for="(ok, key) in report" :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
                <span v-if="ok"><i class="far fa-smile"></i></span>
                <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}  
                </div>
              </div>
            </div>
         </div>
       </div>
       <div class="row">
         <div class="col-lg-6">
           <div class="report-panel">
              <div class="title">高科技配置检测</div>
              <div>
                <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'high_tech'"
                     v-for="(ok, key) in report" :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
                <span v-if="ok"><i class="far fa-smile"></i></span>
                <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}  
                </div>
              </div>
            </div>
         </div>
         <div class="col-lg-6">
           <div class="report-panel">
              <div class="title">灯光系统检测</div>
              <div>
                <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'lighting_system'"
                     v-for="(ok, key) in report" :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
                <span v-if="ok"><i class="far fa-smile"></i></span>
                <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}  
                </div>
              </div>
            </div>
         </div>
       </div>
       <div class="row">
         <div class="col-lg-6">
           <div class="report-panel">
              <div class="title">随车工具检测</div>
              <div>
                <div :key="key" v-if="(conf = report_structure[key]) && conf.cat == 'lighting_system'"
                     v-for="(ok, key) in report" :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
                <span v-if="ok"><i class="far fa-smile"></i></span>
                <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}  
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
  import Nav       from '../components/Nav';
  import SearchBar from '../components/SearchBar';
  import api       from '../lib/api';

  export default {
    mounted() {
      let id = this.get_id();
      this.find(id);
      this.find_report_by_vehicle(id);
      this.get_report_structure();
    },
    components : { Nav, SearchBar },
    data() {
      return {
        selected_preview: 0,
        detail: {},
        report: {},
        report_structure: {},
      };
    },
    methods: {
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
    border-bottom: 1px dashed rgba(0,0,0,.6);
  }

  .sub-title {
    padding: 10px 0;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 10px;
  }

  .order-panel {
    padding-left: 20px;
  }

  .well {
    background: #ddd;
    padding: 10px;
  }

  .well .prop {
    font-size: .9rem;
    color: #666;
  }

  .well > .row {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .short-props > .dib {
    display: inline-block;
    width: 20%;
    padding: 5px;
  }

  .short-props > .dib > * {
    margin-bottom: 5px;
  }

  .short-props .prop {
    font-size: .7rem;
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

  .report-panel {
   padding: 0;
   border: 1px solid rgba(0,0,0,.6);
 }

 .report-item {
   padding: 10px;
   /*border-bottom: 1px solid #ccc;*/
   color: rgba(0,0,0,.6);
   /*font-size: .75rem;*/
 }

 .report-item.muted {
   color: #aaa;
 }

 .report-panel .title {
   background: rgba(0,0,0,.6);
   color: #fff;
   padding: 10px;
   text-align: center;
 }

 .col-lg-6 {
   padding: 5px;
 }
</style>
