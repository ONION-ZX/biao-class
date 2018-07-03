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
           model: 'vehicle',
           searchable : ['title','description'],
         }
       },
       mixins: [AdminPage],
  }
</script>

<style scoped>
 

</style>
