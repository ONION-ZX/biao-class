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
            <h2>用户列表</h2>
            <form @submit="search($event)">
                <input class="search" type="search" v-model="keyword" placeholder="搜" autofocus>
                <button type="submit" hidden>搜</button>
            </form>
            <button @click="show_form = !show_form" class="btn btn-outline-dark tool-bar">创建用户</button>
            <form v-if="show_form" @submit="cou($event)">
                    <div class="input-control">
                        <label>用户名</label>
                        <input v-validator="rule" type="text" v-model="current.username">
                    </div>
                    <div class="input-control">
                        <label>真实姓名</label>
                        <input type="text" v-model="current.realname">
                    </div>
                    <div class="input-control">
                        <label>密码</label>
                        <input v-validator="'required|min_length:6|max_length:64'" type="password" v-model="current.password">
                    </div>
                   <div class="input-control row">
                       <button class="btn btn-outline-secondary" type="submit">提交</button>
                       <button class="btn btn-outline-secondary" @click="show_form = false" type="button">取消</button>
                   </div>
                </form>
                <div class="table">
                    <table v-if="!show_form">
                    <thead>
                        <th>用户名</th>
                        <th>真实姓名</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.username}}</td>
                            <td>{{row.realname}}</td>
                            <td>
                                <button class="btn-small operate" @click="remove(row.id)">删除</button>
                                <button class="btn-small operate" @click="set_current(row)">编辑</button>
                            </td>
                        </tr>
                    </tbody>
              </table>
            </div>
          </div>
          <Pagination :showForm="!show_form" :totalCount="total" :limit="limit" :onChange="on_page_change"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import AdminPage from '../../mixins/AdminPage';

  export default {
       data() {
         return {
           model: 'user',
           searchable : ['username','realname'],
         }
       },
       computed : {
      rule () {
        let def = {
          required   : true,
          username   : true,
          min_length : 4,
          max_length : 18,
          not_exist  : [ 'user', 'username' ],
        };

        if (this.is_update()) {
          def.not_exist.push(this.current.username);
        }
        return def;
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

</style>
