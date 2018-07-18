<template>
  <div>
    <Nav :pushDown = "true"/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <AdminNav/>
        </div>
        <div class="col-lg-9">
            <div class="content-card">
                <h2>二手车列表</h2>
                <form @submit="search($event)">
                    <input class="search" type="search" v-model="keyword" placeholder="搜" autofocus>
                    <button type="submit" hidden>搜</button>
                </form>
                <button @click="show_form = !show_form" class="btn btn-outline-dark tool-bar">创建二手车</button>

                <form v-if="show_form" @submit="cou($event)">
                    <div class="error-list">
                        <div id="exchange_times-error"></div>
                        <div id="publish_reason-error"></div>
                        <div id="price-error"></div>
                        <div id="title-error"></div>
                        <div id="condition-error"></div>
                    </div>
                    <div class="input-control">
                        <label>标题</label>
                        <input error-el="#title-error" v-validator="'required|min_length:4|max_length:15'" type="text" v-model="current.title">
                    </div>
                    <div class="input-control">
                        <label>价格</label>
                        <input error-el="#price-error" v-validator="'positive'" type="number" v-model="current.price">
                    </div>
                    <div class="input-control">
                        <label>封面地址</label>
                        <div style="margin-bottom: 5px;">
                        <div :key="i" v-for="(p, i) in current.preview" class="input-group-3">
                            <input type="text" placeholder="部位" v-model="p.name">
                            <input type="url" placeholder="图片地址" v-model="p.url">
                            <button @click="current.preview.splice(i, 1)" type="button">-</button>
                        </div>
                        </div>
                        <button @click="current.preview.push({})" type="button">+</button>
                    </div>
                    <div class="input-control disib">
                        <label>发布人</label>
                        <Dropdown :onSelect="set_publisher_id" :api="'user.username,realname'" :list = "user_list" displayKey="username" ref="edit_publisher"/>
                    </div>
                    <div class="input-control disib">
                        <label>品牌</label>
                        <Dropdown ref="edit_brand" :onSelect="set_brand_id" :api="'brand.name'" :list = "brand_list"/>
                    </div>
                    <div class="input-control disib">
                        <label>设计</label>
                        <Dropdown :default="current.design_id" ref="edit_design" :onSelect="set_design_id" :api="'design.name'" :list = "design_list"/>
                    </div>
                    <div class="input-control disib">
                        <label>车系</label>
                        <Dropdown ref="edit_model" :onSelect="set_model_id" :api="'model.name'" :list = "model_list"/>
                    </div>
                    <div class="input-control disib">
                        <label>所属位置</label>
                        <Location :onSelect="set_location_id"/>
                    </div>
                    <div class="input-control">
                        <label>卖车原因</label>
                        <input v-validator="'max_length:140'" error-el="#publist_reason-error" type="text" v-model="current.publish_reason">
                    </div>
                    <div class="input-control">
                        <label>当前里程</label>
                        <input error-el="#consumed_distance-error" v-validator="'positive'" type="number" v-model="current.consumed_distance">
                    </div>
                    <div class="input-control">
                        <label>过户次数</label>
                        <input v-validator="'positive'"
                       error-el="#exchange_times-error" type="number" v-model="current.exchange_times">
                    </div>
                    <div class="input-control">
                        <label>首次上牌时间</label>
                        <input type="date" v-model="current.birth_day">
                    </div>
                    <div class="input-control">
                        <label>预期出售时间</label>
                        <input type="date" v-model="current.deadline">
                    </div>
                    <div class="input-control">
                        <label>车况</label>
                        <input v-validator="'positive|max:9'"
                       error-el="#condition-error" type="number" v-model="current.condition">
                    </div>
                    <div class="input-control">
                        <label>描述</label>
                        <textarea v-validator="'max_length:10000'" v-model="current.description"></textarea>
                    </div>
                   <div class="input-control">
                       <label class="disib">促销
                            <input type="checkbox" v-model="current.on_sale">
                        </label>
                        <label class="disib">本地车牌
                            <input type="checkbox" v-model="current.local">
                        </label>
                   </div>
                   <div class="input-control row">
                       <button class="btn btn-outline-secondary" type="submit">提交</button>
                       <button class="btn btn-outline-secondary" @click="show_form = false" type="button">取消</button>
                   </div>
                </form>
                <table class="table" v-if="!show_form">
                    <thead>
                        <th>标题</th>
                        <th>品牌</th>
                        <th>车系</th>
                        <th>设计</th>
                        <th>价格</th>
                        <th>里程</th>
                        <th>首次上牌时间</th>
                        <th>预期出售时间</th>
                        <th>车况</th>
                        <th>过户次数</th>
                        <th>特价</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.title}}</td>
                            <td>{{row.$brand ? row.$brand.name : '-'}}</td>
                            <td>{{row.$model ? row.$model.name : '-'}}</td>
                            <td>{{row.$design ? row.$design.name : '-'}}</td>
                            <td>{{row.price ? row.price : '-'}}</td>
                            <td>{{row.consumed_distance || '-'}}</td>
                            <td>{{row.birth_day || '-'}}</td>
                            <td>{{row.deadline || '-'}}</td>
                            <td>{{row.condition ? row.condition + '成心': '-'}}</td>
                            <td>{{row.exchange_times || '-'}}</td>
                            <td>{{row.on_sale ? '是': '否'}}</td>
                            <td>
                                <button class="btn-small operate" @click="remove(row.id)">删除</button>
                                <button class="btn-small operate" @click="update(row)">编辑</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :showForm="!show_form" :totalCount="total" :limit="limit" :onChange="on_page_change"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */

  import api from "../../lib/api";
  import AdminPage from '../../mixins/AdminPage';
  import Dropdown  from "../../components/Dropdown";


  export default {
      mounted() {
          this.list_user();
          this.list_brand();
          this.list_design();
          this.list_model();
      },
       data() {
         return {
           current: {
               preview: [],
           },
           user_list: [],
           model_list: [],
           design_list: [],
           brand_list: [],
           model: 'vehicle',
           searchable : ['title','description'],
           with: [
               {type: 'has_one', model: 'user'},
               {type: 'has_one', model: 'brand'},
               {type: 'has_one', model: 'design'},
               {type: 'has_one', model: 'model'},
           ]
         }
       },
       methods: {
           after_set_current() {
               this.current.preview = this.current.preview || []; 
           },
           list_user() {
               api('user/read')
                .then(r => {
                    this.user_list = r.data;
                });
           },
           list_model() {
               api('model/read')
                .then(r => {
                   this.model_list = r.data;
               });
           },
           list_design() {
               api('design/read')
                .then(r => {
                    this.design_list = r.data;
                });
           },
           list_brand() {
               api('brand/read')
                .then(r => {
                    this.brand_list = r.data;
                });
           },
          set_brand_id(row) {
            this.$set(this.current, 'brand_id', row.id);
         },
          set_design_id(row) {
            this.$set(this.current, 'design_id', row.id);
         },
         set_model_id(row) {
            this.$set(this.current, 'model_id', row.id);
         },
         set_publisher_id(row) {
           this.$set(this.current, 'publisher_id', row.id);
         },
         set_location_id(row) {
           this.$set(this.current, 'location_id', row.id);
         },
       },
       mixins: [AdminPage],
  }
</script>

<style scoped>

 .disib {
     width: 15%;
     margin-top: 5px;
     display: inline-block;
     margin-bottom: 15px;
 }

 .disib label {
     padding-left: 10px;
     padding-bottom: 5px;
 }
</style>
