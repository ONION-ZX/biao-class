<template>
  <div>
    <button @click="$store.dispatch('increment_timer')">{{$store.state.count}}</button>
                            {{$store.state.info}}
    <button @click="$store.dispatch('get_data')">{{$store.state.count}}</button>

  </div>
</template>

<script>
  export default {}
</script>
