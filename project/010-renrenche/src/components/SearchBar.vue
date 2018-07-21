<template>
  <form class="search-bar" @submit="search($event);submit($event)" v-if="show_form">
    <input type="search"
           placeholder="搜"
           @keyup="change"
           v-model="kwd">
    <button type="submit">🐷</button>
  </form>
</template>

<script>
  export default {
    props: ['onChange', 'onSubmit', 'keyword'],
    data() {
      return {
        show_form: true,
        kwd: '',
      };
    },
    methods: {
      change() {
        if(this.onChange)
          this.onChange(this.kwd);
      },
      submit(e) {
        e.preventDefault();
        if(this.onChangeSubmit)
          this.onSubmit(this.kwd);
      },
      search(e) {
        e.preventDefault();
        this.$router.push({
          path: '/search-result',
          query: {keyword:this.kwd},
        });
      }
    },
    watch: {
      keyword(n) {
        this.kwd = n;
      }
    }
  }
</script>


<style scoped>
  .search-bar {
    /* position: relative; */
    border: 1px solid rgba(0,0,0,.1);
    /* width: 200px; */
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .search-bar input {
    padding-left: 3px;
    border: 0;
    height: 30px;
    width: 80%;
    outline: 0;
  }

  .search-bar [type="submit"] {
    height: 30px;
    border: 0;
    border-left: 1px solid rgba(0,0,0,.1);
    width: 20%;
    padding: 0;
  }
</style>
