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
                <h2>二手车列表</h2>
                <button @click="show_form = !show_form" class="tool-bar">创建二手车</button>
                <form @submit="search($event)">
                    <input type="search" v-model="keyword" placeholder="搜标题/描述" autofocus>
                    <button type="submit" hidden>搜</button>
                </form>

                <form v-if="show_form" @submit="cou($event)">
                    <div class="input-control">
                        <label>标题</label>
                        <input type="text" v-model="current.title">
                    </div>
                    <div class="input-control">
                        <label>价格</label>
                        <input type="number" v-model="current.price">
                    </div>
                    <div class="input-control">
                        <label>卖车原因</label>
                        <input type="text" v-model="current.publish_reason">
                    </div>
                    <div class="input-control">
                        <label>当前历程</label>
                        <input type="number" v-model="current.consumed_distance">
                    </div>
                    <div class="input-control">
                        <label>过户次数</label>
                        <input type="number" v-model="current.exchange_times">
                    </div>
                    <div class="input-control">
                        <label>首次上牌时间</label>
                        <input type="datetime-local" v-model="current.birthday">
                    </div>
                    <div class="input-control">
                        <label>预期出售时间</label>
                        <input type="datetime-local" v-model="current.deadline">
                    </div>
                    <div class="input-control">
                        <label>车况</label>
                        <input type="number" v-model="current.condition">
                    </div>
                    <div class="input-control">
                        <label>描述</label>
                        <textarea v-model="current.description"></textarea>
                    </div>
                   <div class="input-control">
                       <label class="dib">促销
                            <input type="checkbox" v-model="current.on_sale">
                        </label>
                        <label class="dib">本地车牌
                            <input type="checkbox" v-model="current.local">
                        </label>
                   </div>
                   <div class="input-control">
                       <button class="btn-primary" type="submit">提交</button>
                       <button @click="show_form = false" type="button">取消</button>
                   </div>
                </form>
                <table>
                    <thead>
                        <th>标题</th>
                        <th>价格</th>
                        <th>里程</th>
                        <th>预期出售时间</th>
                        <th>车况</th>
                        <th>过户次数</th>
                        <th>特价</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.title}}</td>
                            <td>{{row.price}}</td>
                            <td>{{row.consumed_distance || '-'}}</td>
                            <td>{{row.deadline || '-'}}</td>
                            <td>{{row.condition ? row.condition + '成心': '-'}}</td>
                            <td>{{row.exchange_times || '-'}}</td>
                            <td>{{row.on_sale || '-'}}</td>
                            <td>
                                <button class="btn-small" @click="remove(row.id)">删除</button>
                                <button class="btn-small" @click="set_current(row)">编辑</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button class="btn-small" @click="read(1)">First</button>

                &nbsp;

                <span class="btn-group">
                    <button :key="page" v-if="Math.abs(page - current_page) < 3" @click="read(page)" :class="{active: current_page == page}" v-for="page in last_page" class="btn-small">{{page}}</button>
                </span>
                &nbsp;
                <button class="btn-small" @click="read(last_page)">Last</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../css/admin.css';
  import AdminNav from '../../components/AdminNav.vue';
  import Nav from '../../components/Nav.vue';
  import api from '../../lib/api';
  
  export default {
    components : { AdminNav, Nav },

    data() {
        return {
            keyword: '',
            list: [],
            current: {},
            edit_mode: false,
            show_form: false,
        };
    },

    mounted() {
        this.read();
    },
    methods: {
        read(page = 1) {
            if(page == this.current_page)
                return;
            api('vehicle/read',{limit:3, page:page})
              .then(r => {
                  this.list = r.data;
                  this.last_page = r.last_page;
                  this.current_page = r.current_page;
              });
        },
        remove(id) {
            api('vehicle/delete',{id})
              .then(()=> {
                  if(!confirm('确定要删除?'))
                    return;
                  this.read();
              });
        },
        cou(e) {
            let action = this.current.id ? 'update' : 'create';
            e.preventDefault();
            api(`vehicle/${action}`,this.current)
              .then(()=> {
                  this.current = {};
                  this.read();
              });
        },
        set_current(row) {
            this.current = row;
            this.show_form = true;
        },
        search(e) {
            e.preventDefault();
            let kwd = this.keyword;
            let param = {
                or: {
                    title: kwd,
                    description: kwd,
                },
            };
            api('vehicle/search',param)
                .then(r => {
                    this.list = r.data;
                });
        },
    },
  };
</script>

<style scoped>
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
