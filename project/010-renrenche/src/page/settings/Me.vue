<template>
  <div>
    <Nav :push-down="true"/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <SettingNav/>
        </div>
        <div class="col-lg-9 shell">
          <div class="content">
            <div class="row">
                <h1>基础信息</h1>
            </div>
            <form v-if="edit_mode">
              <div class="row prop-item">
                <label class="col-lg-6 key right">昵称</label>
                <input class="col-lg-3 value" type="text">
              </div>
              <div class="row prop-item">
                <label class="col-lg-6 key right">真实姓名</label>
                <input class="col-lg-3 value" type="text">
              </div>
              <div class="row btn-group">
                <button class="btn btn-primary" type="submit">提交</button>
                <button class="btn btn-light" @click="edit_mode=false" type="button">取消</button>
              </div>
            </form>
            <div class="showinfo_box" v-else>
              <div class="row prop-item">
                <div class="col-lg-6 key right">昵称</div>
                <div class="col-lg-6 value">yo</div>
              </div>
              <div class="row prop-item">
                <div class="col-lg-6 key right">真实姓名</div>
                <div class="col-lg-6 value">王花花</div>
              </div>
              <div class="tool-bar">
                <button class="btn" @click="edit_mode=true">修改</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../css/admin.css';

  import SettingNav from '../../components/SettingNav.vue';
  import Nav        from '../../components/Nav.vue';

  export default {
    components : { SettingNav, Nav },
    data () {
      return {
        edit_mode : false,
      };
    },
  };
</script>

<style scoped>
  .shell {
      margin-top: 5px;
      background: #fff;
      padding:10px 15px 30px 15px;
  }

  .shell h1 {
      text-align: center;
      padding-top: 25px;
      margin-bottom: 15px;
  }
  .prop-item {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .prop-item .key {
    opacity: .6;
    padding-right: 5px;
  }

  .showinfo_box {
      padding: 15px;
      margin-bottom: 20px;
  }

  .tool-bar,
  .btn-group {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 195px;
    left: 5px;
  }

  .content form {
      margin-top: 25px;
  }

  .btn-primary {
    color: #fff !important;
  }

</style>
