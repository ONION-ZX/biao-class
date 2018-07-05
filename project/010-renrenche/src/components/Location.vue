<template>
  <div class="location">
    <div class="step">
      <div :class="{active: lo.id == current.city, item:true}" @click="select(lo, 'city')"
           v-for="lo in
      location.state">{{lo.name}}
      </div>
    </div>
    <div class="step">
      <div :class="{active: lo.id == current.county, item:true}" @click="select(lo, 'county')"
           v-for="lo in
      location.city">{{lo.name}}
      </div>
    </div>
    <div class="step">
      <div :class="{active: lo.id == current.county, item:true}" @click="select(lo)"
           v-for="lo in location.county">{{lo.name}}
      </div>
    </div>
  </div>
</template>

<script>

  const china_id = 1;

  import api from '../lib/api';

  export default {
    props : {
      onSelect : {},
    },

    mounted () {
      this.read(china_id, 'state');
    },

    methods : {
      select (row, type) {
        this.current[ type ] = row.id;
        this.read(row.id, type);
      },
      read (parent_id, type) {
        this.parent_id = parent_id;
        api('location/read', {
          where : {
            and : { parent_id },
          },
        }).then(r => {
          this.location[ type ] = r.data;
        });
      },
    },

    data () {
      return {
        parent_id : null,
        location  : {
          state  : [],
          city   : [],
          county : [],
        },
        current   : {
          state  : null,
          city   : null,
          county : null,
        },
      };
    },
  };
</script>

<style scoped>
  .location {
    max-width: 200px;
  }

  .location .step {
    display: inline-block;
    width: 33.333333333%;
    max-height: 100px;
  }

  .location .item {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .location .item.active {
    background: #fd521d;
    color: #fff;
  }
</style>
