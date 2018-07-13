<template>
  <div>
    <Nav :push-down="true"/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <AdminNav/>
        </div>
        <div class="col-lg-9">
          <div class="content-card">
            <h2>车系列表</h2>
            <form @submit="search($event)">
                <input class="search" type="search" v-model="keyword" placeholder="搜" autofocus>
                <button type="submit" hidden>搜</button>
            </form>
            <button @click="show_form = !show_form" class="btn btn-outline-dark tool-bar">创建车系</button>
            <form v-if="show_form" @submit="cou($event)">
                    <div class="input-control">
                        <label>型号名</label>
                        <input v-validator="'required|max_length:64'" type="text" v-model="current.name">
                    </div>
                    <div class="input-control dropdown">
                        <label>品牌</label>
                        <Dropdown :default="current.brand_id" :list="brand_list" :onSelect="set_brand_id" ref="edit_brand"/>
                        <!-- <input type="text" v-model="current.name"> -->
                    </div>
                    <div class="input-control dropdown">
                      <label>设计</label>
                      <Dropdown :default="current.design_id" :list="design_list" :onSelect="set_design_id" ref="edit_design"/>
                    </div>
                    <div class="input-control row">
                        <button class="btn btn-outline-secondary" type="submit">提交</button>
                        <button class="btn btn-outline-secondary" @click="clear" type="button">取消</button>
                    </div>
                </form>
                <div class="table">
                    <table v-if="!show_form">
                    <thead>
                        <th>型号名</th>
                        <th>品牌</th>
                        <th>设计</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.name}}</td>
                            <td>{{row.$brand ? row.$brand.name : '-'}}</td>
                            <td>{{row.$design ? row.$design.name: '-'}}</td>
                            <td>
                                <button class="btn-small operate" @click="remove(row.id)">删除</button>
                                <button class="btn-small operate" @click="update(row)">编辑</button>
                            </td>
                        </tr>
                    </tbody>
              </table>
            </div>
          </div>
          <Pagination v-if="!show_form" :showForm="!show_form" :totalCount="total" :limit="limit" :onChange="on_page_change"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import api from '../../lib/api';
  import Dropdown  from "../../components/Dropdown";
  import AdminPage from '../../mixins/AdminPage';

  export default {
      created() {
        this.read_brand();
        this.read_design();

      },

      components: {Dropdown},
       data() {
         return {
           design_list:[],
           brand_list: [],
           model : 'model',
           searchable : ['name'],
           with       : [
          { model : 'brand', type : 'has_one' },
          { model : 'design', type : 'has_one' },
          ],
         }
       },
       methods: {
         clear() {
           this.show_form = false;
           this.current = {};
         },
         read_brand() {
           api('brand/read')
              .then((r) => {
             this.brand_list = r.data;
          });
         },
         read_design() {
           api('design/read')
              .then((r) => {
             this.design_list = r.data;
          });
         },
         set_brand_id(row) {
           this.$set(this.current, 'brand_id', row.id);
         },
         set_design_id(row) {
           this.$set(this.current, 'design_id', row.id);
         },
       },
       mixins: [AdminPage],
  }
</script>

<style scoped>

  .table {
    overflow: auto;
  }

  th, td {
    padding: 5px 10px;
    text-align: left;
  }

  .dropdown {
    width: 50%;
  }

  .dropdown label {
    padding: 5px;
    padding-left: 0;
  }

</style>
