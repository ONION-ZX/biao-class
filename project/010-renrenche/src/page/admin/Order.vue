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
            <h2>预约列表</h2>
            <form @submit="search($event)">
                <input class="search" type="search" v-model="keyword" placeholder="搜" autofocus>
                <button type="submit" hidden>搜</button>
            </form>
            <button @click="show_form = !show_form" class="btn btn-outline-dark tool-bar">创建预约</button>
            <form v-if="show_form" @submit="cou($event)">
                    <div class="input-control">
                        <label>预约人</label>
                         <Dropdown api="user.username,realname"
                                   displayKey="username"
                                   :onSelect="set_user_id"/>

                    </div>
                    <div class="input-control">
                        <label>预约车辆</label>
                        <Dropdown api="vehicle.title,description"
                                  displayKey="title"
                                  :onSelect="set_vehicle_id"/>
                    </div>
                    <div class="input-control">
                        <label>备注</label>
                        <textarea v-model="current.remark"></textarea>
                    </div>

                    <div class="input-control">
                        <label>预约时间</label>
                        <input type="date" v-model="current.appointed_at">
                    </div>
                   <div class="input-control row">
                       <button class="btn btn-outline-secondary" type="submit">提交</button>
                       <button class="btn btn-outline-secondary" @click="show_form = false" type="button">取消</button>
                   </div>
                </form>
                <div class="table">
                    <table v-if="!show_form">
                    <thead>
                        <th>预约人</th>
                        <th>预约车辆</th>
                        <th>备注</th>
                        <th>预约时间</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.$user ? row.$user.username : '-'}}</td>
                            <td>{{row.$vehicle ? row.$vehicle.title : '-'}}</td>
                            <td>{{row.remark}}</td>
                            <td>{{row.appointed_at}}</td>
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
           current: {},
           model: 'order',
           searchable : ['remark'],
           with: [
               {type: 'has_one', model: 'user'},
               {type: 'has_one', model: 'vehicle'},
           ]
         }
       },
       mixins: [AdminPage],
       methods: {
        set_user_id (row) {
           this.$set(this.current, 'user_id', row.id);
         },
         set_vehicle_id (row) {
           this.$set(this.current, 'vehicle_id', row.id);
         },
       }
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
