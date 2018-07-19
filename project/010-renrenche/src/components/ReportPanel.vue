<template>
    <div class="report-panel">
        <div class="title">{{title || '检测报告'}}</div>
        <div v-if="report_not_empty()">
            <div :key="key" v-if="(conf = reportStructure[key]) && conf.cat == cat"
                    v-for="(ok, key) in report" :class="'col-lg-4 report-item ' + ( !ok ? 'muted' : '')">
                <span v-if="ok"><i class="far fa-smile"></i></span>
                <span v-else><i class="far fa-frown"></i></span> {{conf.display_name}}
            </div>
        </div>
        <div v-else class="empty-holder">此二手车暂无检测信息</div>
    </div>
</template>

<script>
export default {
    props: ['title', 'reportStructure', 'cat', 'report'],
    methods: {
        report_not_empty() {
            if(!this.report)
                return false;
            return Object.keys(this.report).length;
        },
    },
}
</script>

<style>
.report-panel {
   padding: 0;
   border: 1px solid rgba(0,0,0,.6);
 }

 .report-item {
   padding: 10px;
   /*border-bottom: 1px solid #ccc;*/
   color: rgba(0,0,0,.6);
   /*font-size: .75rem;*/
 }

 .report-item.muted {
   color: #aaa;
 }

 .report-panel .title {
   background: rgba(0,0,0,.6);
   color: #fff;
   padding: 10px;
   text-align: center;
 }
</style>


