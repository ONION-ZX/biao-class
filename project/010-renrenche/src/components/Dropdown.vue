<template>
  <div @mouseleave="show_menu=false" class="dropdown">
    <input @keyup="show_menu=true"
           v-model="keyword"
           @focus="show_menu=true"
           placeholder="搜"
           type="search">
    <div @mouseenter="show_menu=true" class="selected">{{selected ? selected[displayKey] : '请选择'}}</div>
    <div v-if="show_menu" class="menu">
      <div ref="p" :key="index" @click="select(row)" v-for="(row, index) in list">{{row[displayKey]}}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import api from '../lib/api';
  export default {
    mounted() {
      let list = this.list;
      this.api_conf = this.parse_api();
      list && (this.result = Object.assign([], this.list));
    },
    props   : {
      api: {}, //异步搜索
      list       : { //同步搜索 传入静态数据 通常为数组
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
        api_conf: {},
        result: [],
        keyword: '',
        selected  : '',
        show_menu : false,
        timer: null,
      };
    },
    methods : {
      parse_api() {
        let api_prop = this.api;
        if(typeof api_prop != 'string')
          return Object.assign({},api);
        api_prop = api_prop.split('.');
        let model = api_prop[0];
        let property = api_prop[1];

        property = property.split(',');

        return {
          model,
          property,
        };
      },
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
      search () {
        let condition = {};

        let property = this.api_conf.property;

        if (!property)
          return;

        property.forEach(prop => {
          condition[ prop ] = this.keyword;
        });

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          api(`${this.api_conf.model}/search`, { or : condition })
            .then(r => {
              this.result = r.data;
            });
        }, 300);
      },
      filter () {
        this.result = Object.assign([], this.list);
        this.result = this.result.filter(row => {
          return row[ this.displayKey ].indexOf(this.keyword) !== -1;
        });
      },
    },
      watch : {
      keyword() {
        if(this.api)
          this.search();
        else 
          this.filter();
      }
    },
    }
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
