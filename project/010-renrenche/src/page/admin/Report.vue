<template>
  <div>
    <Nav :push-down="true"/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <AdminNav/>
        </div>
        <div class="col-lg-9">
          <div class="content card">
            <h2>检测报告列表</h2>
            <div class="tool-bar">
              <div class="btn-group">
                <button @click="show_form=!show_form">创建检测报告</button>
              </div>
              <form @submit="search($event)">
                <input type="search" v-model="keyword"
                       placeholder="搜标题/描述" autofocus>
                <button type="submit" hidden>搜</button>
              </form>
              <small>共有{{total_check}}个检测项</small>
            </div>

            <form v-if="show_form" @submit="cou($event)">
                <Dropdown api="vehicle.title"
                          placeholder="请选择检测车辆"
                          displayKey="title"
                          :onSelect="set_vehicle_id"
                />
              <fieldset :disabled="!current.vehicle_id">
                  <div class="btn-group">
                    <button type="button" @click="check_all()">全部通过</button>
                    <button type="button" @click="uncheck_all()">全部未通过</button>
                    <button type="button" @click="check_random()">随机通过</button>
                  </div>
                <div>
                  <div :key="key" v-if="prop.display_name" v-for="(prop, key) in structure" class="col-lg-4 input-control">
                    <input type="checkbox" v-model="current[key]">
                    <label class="simple-checker">
                      {{prop.display_name}}
                    </label>
                  </div>
                </div>
              </fieldset>
              <div class="input-control">
                <div class="btn-group">
                  <button class="btn-primary" type="submit">提交</button>
                  <button @click="show_form=false" type="button">取消</button>
                </div>
              </div>
            </form>
            <div class="table" v-if="!show_form">
              <table>
                <thead>
                <th>检测报告名</th>
                <th>通过数</th>
                <th>通过率</th>
                <th>操作</th>
                </thead>
                <tbody>
                <tr :key="i" v-for="(row,i) in list">
                  <td>
                    <router-link target="_blank" v-if="row.$vehicle" :to="'/detail/' + row.$vehicle.id">
                      {{row.$vehicle.title}}
                    </router-link>
                    <span v-else>-</span>
                  </td>
                  <td>{{passed_count = compute_passed_check(row)}}</td>
                  <td>{{passed_count / total_check | percentage }}</td>
                  <td>
                    <div class="btn-group">
                      <button class="btn-small" @click="set_current(row)">编辑</button>
                      <button class="btn-small" @click="remove(row.id)">删除</button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <Pagination :totalCount="total" :limit="limit" :onChange="on_page_change"/>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import '../../css/admin.css';
  import AdminPage from '../../mixins/AdminPage';
  import Dropdown  from "../../components/Dropdown";
  import api       from '../../lib/api';
  export default {
    mixins: [ AdminPage ],
    mounted () {
      this.read();
      this.get_structure();
    },
    components : { Dropdown },
    data () {
      return {
        brand_list : [],
        structure  : {},
        model      : 'report',
        searchable : [ 'title' ],
        with       : [
            {model: 'vehicle', type: 'has_one'},
        ],
        total_check: 0,
      };
    },
    methods : {
      set_vehicle_id(row) {
          this.$set(this.current, 'vehicle_id', row.id)
      },
      each_prop (fn) {
        for (let key in this.structure) {
          let prop = this.structure[ key ];
          if (fn) {
            fn(prop, key);
          }
        }
      },
      compute_total_check() {
          let count = 0;
          this.each_prop((prop) => {
              prop.display_name && count ++;
          });
          this.total_check = count;
      },
      compute_passed_check(row) {
          let count = 0;
          row = row || this.current;
          this.each_prop((prop, key) => {
              prop.display_name && row[key] && count ++;
          });
          return count;
      },
      check_all (check=true) {
        this.each_prop((prop, key) => {
          if (!prop.display_name)
            return;
          this.$set(this.current, key, check);
        });
      },
      uncheck_all () {
        this.check_all(false);
      },
      check_random () {
        this.each_prop((prop, key) => {
          if (!prop.display_name)
            return;
          this.$set(this.current, key, Math.random() >= .5);
        });
      },
      get_structure () {
        api('MODEL/FIND', { name : 'report' })
          .then(r => {
              this.structure = r.data.structure
              this.compute_total_check();
              });
      }, 
    },
    watch: {
        current: {
            deep:true,
            handler() {
                this.compute_passed_check();
            },
        }
    }
  };
</script>

<style scoped>
  .input-control {
      padding: 5px;
      height: 40px;
      font-size: 0;
      border-bottom: 0;
  }
  .input-control button {
      padding: 5px;
      font-size: 15px;
  }
  .input-control  input,
  .input-control  label{
      display:inline-block;
      font-size: 15px;
  }
  /* .input-control  label {
      width: 70%;
  } */
  .input-control  input {
      width: 30%;
  }
  .col-lg-9 {
      padding-left: 20px;
  }  
  .dropdown {
      margin-bottom: 10px;
  }
  h2 {
    margin-top: 0;
    font-size: 16px;
  }
  .table {
    overflow: auto;
  }
  th, td {
    padding: 5px 10px;
    text-align: left;
  }
</style>