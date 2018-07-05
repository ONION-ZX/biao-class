<template>
  <div @mouseleave="show_menu=false" class="dropdown">
    <div @click="show_menu=true" class="selected">{{selected ? selected[displayKey] : '请选择'}}</div>
    <div v-if="show_menu" class="menu">
      <div class="item" ref="p" :key="index" @click="select(row)" v-for="(row, index) in list">{{row[displayKey]}}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    props   : {
      list       : {},
      onSelect   : {},
      displayKey : {
        default : 'name',
      },
    },
    data () {
      return {
        selected  : '',
        show_menu : false,
      };
    },
    methods : {
      select (row) {
        this.selected = row;
        this.show_menu = false;

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
      default : {
        deep : true,
        handler () {
          this.set_default();
        },
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
