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
            <h2>用户列表</h2>
            <div class="table">
              <table>
                <thead>
                <th>用户名</th>
                <th>手机号</th>
                <th>邮箱</th>
                <th>近期卖车</th>
                <th>近期买车</th>
                </thead>
                <tbody>
                <tr>
                  <td>whh</td>
                  <td>18399998888</td>
                  <td>whh@yo.com</td>
                  <td>是</td>
                  <td>否</td>
                </tr>
                <tr>
                  <td>lsd</td>
                  <td>18399998888</td>
                  <td>lsd@yo.com</td>
                  <td>是</td>
                  <td>否</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import '../../css/admin.css';

  import AdminNav from '../../components/AdminNav.vue';
  import Nav      from '../../components/Nav.vue';
  import Footer   from '../../components/Footer.vue';

  export default {
    components : { AdminNav, Nav, Footer },
    data () {
      return {
        edit_mode : false,
      };
    },
  };
</script>

<style scoped>
  h2 {
    padding: 15px;
  }

  .table {
    overflow: auto;
  }

  .content {
    padding: 15px;
  }

  th, td {
    padding: 5px 10px;
    text-align: left;
  }

</style>
