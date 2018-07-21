<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container por">
        <form @submit="submit" class="main-form" autocomplete="off">
          <div v-if="step == 1">
            <h1>要卖什么车？</h1>
            <div class="input-control">
                <div class="brand">
                    <label>品牌</label>
                    <Dropdown :list="brand_list"
                            :onSelect="set_brand_id"/>
                </div>
            </div>
            <div class="input-control">
                <div class="model">
                    <label>型号</label>
                    <Dropdown :list="model_list"
                          :onSelect="set_model_id"/>
                </div>
            </div>
          </div>

          <div v-if="step == 2">
            <h1>怎么联系你？</h1>
            <div class="input-control">
              <label>请输入您的手机号</label>
              <input v-validator="'required|cellphone'"
                     error-el="#phone-error"
                     v-model="current.phone"
                     :key="'phone'"
                     type="text">
              <div class="error-list">
                <div id="phone-error"></div>
              </div>
            </div>
          </div>

          <div v-if="step == 3">
            <h1>发布成功</h1>
            <p>审核中...</p>
            <p>
              <router-link to="/">回到首页</router-link>
            </p>
          </div>

          <div class="row bottom">
            <div class="col-lg-6">
              <button type="button" @click="dec()" v-if="step > 1 && step < 3">上一步</button>
            </div>
            <div class="col-lg-6">
              <button type="button" @click="inc()" v-if="step < 2">下一步</button>
              <button type="submit" class="btn-primary" v-if="step == 2"
                      :disabled="!current.brand_id || !current.model_id || !current.phone">发布二手车
              </button>
            </div>
          </div>

          <button class="btn-primary" type="submit" hidden>注册</button>
        </form>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Nav      from '../components/Nav';
  import Footer      from '../components/Footer';

  import Dropdown from '../components/Dropdown';
  import api      from '../lib/api';
  import session  from '../lib/session';
  import faker    from '../lib/faker';

  export default {
    mounted () {
      this.list_brand();
      this.list_model();
      this.list_design();
    },
    data () {
      return {
        current     : {},
        step        : 1,
        brand_list  : [],
        model_list  : [],
        design_list : [],
      };
    },
    components : { Nav, Dropdown, Footer },

    methods : {
      inc () {
        if (this.step >= 3)
          return;
        this.step++;
      },
      dec () {
        if (this.step <= 1)
          return;
        this.step--;
      },
      submit (e) {
        e.preventDefault();
        let fake    = {};
        let current = this.current;

        let brand = this.brand_list.find(it => {
          return it.id == this.current.brand_id;
        }).name;

        let model = this.model_list.find(it => {
          return it.id == this.current.model_id;
        }).name;


        fake.title          = faker.title(brand, model);
        fake.price          = faker.price();
        fake.publish_reason = faker.reason();
        fake.exchange_times = faker.rand_int(1, 5);
        fake.birth_day      = faker.rand_date();
        fake.deadline       = faker.rand_deadline();
        fake.condition      = faker.rand_int(1, 9);
        fake.design_id      = this.design_list[ faker.rand_int(0, this.design_list.length - 1) ].id;

        current.publisher_id = session.his_id();

        current = Object.assign({}, current, fake);

        api('vehicle/create', current)
          .then(() => {
            this.step = 3;
          });
      },
      list_brand () {
        api('brand/read')
          .then(r => {
            this.brand_list = r.data;
          });
      },

      list_design () {
        api('design/read')
          .then(r => {
            this.design_list = r.data;
          });
      },

      list_model () {
        api('model/read')
          .then(r => {
            this.model_list = r.data;
          });
      },

      set_model_id (row) {
        this.$set(this.current, 'model_id', row.id);
      },

      set_brand_id (row) {
        this.$set(this.current, 'brand_id', row.id);
      },
    },
  };
</script>

<style scoped>
  .dropdown {
    width: 100%;
  }

  .input-control {
    border-bottom: 1px solid rgba(0,0,0,.3);
  }

  .input-control label {
      font-size: 16px;
  }

  .main-form {
    max-width: 500px;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
      padding-bottom: 20px;
  }

  /* .input-group-3 input, .input-control {
      border-bottom: 0;
  } */

  .bottom {
      margin-top: 20px;
  }

</style>
