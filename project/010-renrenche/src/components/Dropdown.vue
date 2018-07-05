<template>
   <div @mouseleave="show_menu=false" class="dropdown">
    <input v-if="api"
           @keyup="show_menu=true"
           v-model="keyword"
           type="search">
    <div v-if="list.length" @click="show_menu=true"
         class="selected">
      {{selected ? selected[displayKey] : '请选择'}}
     </div>
    <div v-if="show_menu && result.length" class="menu">
      <div :key="index" @click="select(row)" class="menu-item" v-for="(row,index) in result">{{row[displayKey]}}</div>
    </div>
   </div>
 </template>

<script>
/* eslint-disable */
  import api from '../lib/api';
  export default {
    mounted() {
      let list = this.list;
      list && (this.result = this.list);
    },
    props   : {
      api: {},
      list       : {
        default() {
          return [];
        },
      },
      onSelect   : {},
      displayKey : {
        default : 'name',
      },
    },
    data () {
      return {
        result: [],
        keyword: '',
        selected  : '',
        show_menu : false,
        timer: null,
      };
    },
    methods : {
      select (row) {
        this.selected = row;
        this.show_menu = false;
        this.keyword = row[this.displayKey];

        if (this.onSelect)
          this.onSelect(row);
      },
      on_edit(row) {
        if(!row)
          this.selected = {};
        this.selected = row;
      },
    },
    watch : {
      keyword () {

        let condition = {};
        this.api.property.forEach(prop => {
          condition[ prop ] = this.keyword;
        });

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          api(`${this.api.model}/search`, { or : condition })
            .then(r => {
              this.result = r.data;
            });
        }, 300);
      },
    },
  };
</script>

<style scoped>
  .dropdown {
    position: relative;
    display: inline-block;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .1);
  }
  
  .selected,
  .menu > * {
    display: block;
    padding: 2px 5px;
    cursor: default;
  }

  .item {
    font-size: 15px;
  }

  .item:hover {
    background: rgba(0, 0, 0, .1);
  }

  .menu {
    background: #fff;
    z-index: 1;
    width: 100px;
    position: absolute;
  }
</style>
