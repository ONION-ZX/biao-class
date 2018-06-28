<template>
  <div @mouseleave="show_menu=false" class="dropdown">
    <div @mouseenter="show_menu=true" class="selected">{{selected[displayKey] || '请选择'}}</div>
    <div v-if="show_menu" class="menu">
      <div :key="index" @click="select(row)" v-for="(row,index) in list">{{row[displayKey]}}</div>
    </div>
  </div>
</template>

<script>
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
        selected  : {},
        show_menu : false,
      };
    },
    methods : {
      select (row) {
        this.selected = row;

        if (this.onSelect)
          this.onSelect(row);
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
  }

  .menu {
    background: #fff;
    z-index: 1;
    width: 100px;
    position: absolute;
  }
</style>
