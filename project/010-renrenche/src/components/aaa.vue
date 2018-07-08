<template>
   <div @mouseleave="show_menu=false" class="dropdown">
    <input @mouseenter="show_menu=true"
           v-model="keyword"
           @focus="show_menu=true"
           placeholder="请选择"
           type="search">
    <div v-if="show_menu && result.length" class="menu">
      <div :key="index" @click="select(row)" class="menu-item" v-for="(row,index) in result">{{row[displayKey]}}</div>
    </div>
   </div>
 </template>