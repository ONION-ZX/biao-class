<template>
    <fieldset class="pagination" v-if="last_page">
        <button :disabled="is_first_page" class="btn-small btn " @click="change(1)">First</button>
        <button :disabled="is_first_page" class="btn-small btn " @click="prev()">Prev</button>

        &nbsp;

        <span class="btn-group">
            <button :key="page" v-if="Math.abs(page - current_page) <= half_limit" @click="change(page)" :class="{active: current_page == page}" v-for="page in last_page" class="btn-small btn">{{page}}</button>
        </span>
        &nbsp;
        <button :disabled="is_last_page" class="btn-small btn " @click="next()">Next</button>
        <button :disabled="is_last_page" class="btn-small btn" @click="change(last_page)">Last</button>
    </fieldset>
</template>

<script>
export default {
    mounted() {
        this.current_page = this.currentPage;
    },
    props: {
        limit: {
            default: 0,
        },
        totalCount: {
            default: 0,
        },
        onChange: {
            default () {
                // console.log(1);
         },
        },
        currentPage: {
            default: 1,
        },
    },
    data() {
        return {
            current_page : 1,
        };
    },
    methods: {
        change(page) {
            if(this.onChange)
                this.onChange(page);
            this.current_page = page;
        },
        next() {
            if(this.is_last_page)
                return;
            this.change(++this.current_page);
        },
        prev() {
            if(this.is_first_page) 
                return;
            this.change(--this.current_page);
        },
    },
    computed: {
        half_limit() {
            return Math.floor(this.limit / 2);
        },
        is_first_page() {
            return this.current_page == 1;
        },
        is_last_page() {
            return this.current_page == Math.ceil(this.totalCount / this.limit);
        },
        last_page() {
            return Math.ceil(this.totalCount / this.limit);
        },
    },
    watch: {
        currentPage(n) {
            this.current_page = n;
        }
    },
}
</script>

<style>
    .pagination {
      margin-top: 25px;
      margin-bottom: 25px;
    }

    .pagination button {
        background: #fff;
    }
</style>
