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
                        <label>当前里程</label>
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
                        <input type="text" v-model="current.deadline">
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
                <table v-if="!show_form">
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
                                <button class="btn-small operate" @click="remove(row.id)">删除</button>
                                <button class="btn-small operate" @click="set_current(row)">编辑</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination" v-if="!show_form">
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
            last_page: 0,
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
            api('vehicle/read',{limit: 3, page:page})
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
    margin: 15px;
    margin-left: 0;
    margin-top: 5px;
    font-size: 25px;
    color: rgba(0,0,0,.6);
  }

  .table {
    overflow: auto;
  }

  .operate {
     color: rgba(0,0,0,.6);
  }

  .operate:hover {
      background:rgba(0,0,0,.6);
      color: #fff;
  }

  th, td {
    font-size: 15px;
    color: rgba(0,0,0,.6);
    padding: 5px 10px;
    text-align: left;
  }
  th {
      font-weight: normal;
  }


  button {
      border-collapse:collapse;
      vertical-align: bottom;
      line-height: 1.5;
      background: #fff;
      border: 1px solid rgba(0,0,0,.125);
  }

  .pagination {
      margin-left: 200px;
  }

  .btn-outline-dark {
      margin-top: 15px;
      margin-bottom: 10px;
  }

  .input-control label {
      color: rgba(0,0,0,.6);
      font-size: 15px;
  }

  .input-control input {
      border: 0;
      border-bottom: 1px solid rgba(0,0,0,.2);
      padding-left: 5px;
      margin-bottom: 10px;
  }

  textarea {
      width: 100%;
  }

  .disib {
      display: inline-block !important;
      width: 50%;
  }

  .input-control.row {
      margin:15px 0;
      margin-left: 255px;
  }

  .row > button {
      font-size: 15px;
  }

</style>
