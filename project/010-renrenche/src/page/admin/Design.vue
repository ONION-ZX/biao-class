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
            <h2>设计列表</h2>
            <form @submit="search($event)">
                <input class="search" type="search" v-model="keyword" placeholder="搜" autofocus>
                <button type="submit" hidden>搜</button>
            </form>
            <button @click="show_form = !show_form" class="btn btn-outline-dark tool-bar">创建设计</button>
            <form v-if="show_form" @submit="cou($event)">
                    <div class="input-control">
                        <label>设计名</label>
                        <input type="text" v-model="current.name">
                    </div>
                   <div class="input-control row">
                       <button class="btn btn-outline-secondary" type="submit">提交</button>
                       <button class="btn btn-outline-secondary" @click="show_form = false" type="button">取消</button>
                   </div>
                </form>
                <div class="table">
                    <table v-if="!show_form">
                    <thead>
                        <th>设计名</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.name}}</td>
                            <td>
                                <button class="btn-small operate" @click="remove(row.id)">删除</button>
                                <button class="btn-small operate" @click="set_current(row)">编辑</button>
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
  import AdminPage from '../../mixins/AdminPage';

  export default {
       data() {
         return {
           model: 'design',
           searchable : ['name'],
         }
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
