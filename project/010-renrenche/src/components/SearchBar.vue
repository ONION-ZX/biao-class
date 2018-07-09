<template>
  <form @submit="search($event);submit($event)" class="search-bar">
    <input placeholder="现代领动"
           type="search"
           @keyup="change()"
           v-model="keyword"
           autofocus>
    <button type="submit">搜</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
      };
    },
    props: ['onChange','onSubmit'],
    methods: {
      change() {
        if(this.onChange)
          this.onChange(this.keyword);
      },
      submit(e) {
        e.preventDefault();
        if(this.onSubmit)
          this.onSubmit(this.keyword);
      },
      search(e) {
        e.preventDefault();
        this.$router.push({
          path: '/search-result',
          query: {keyword: this.keyword},
        })
      },
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
    /* height: 25px; */
    width: 80%;
    outline: 0;
  }

  .search-bar [type="submit"] {
    /* height: 30px; */
    border: 0;
    border-left: 1px solid rgba(0,0,0,.1);
    width: 20%;
    padding: 0;
  }
</style>
