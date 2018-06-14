window.root =new Vue({
    el: '#root',
    data: {
        current : null,
        memo_list : [],
    },
    methods: {
        add() {
            this.current = {};
            this.memo_list.push(this.current);
        },
        remove(index) {
            this.memo_list.splice(index, 1);
        },
        sync_to(memo_list) {
            localStorage.setItem('memo_list',JSON.stringify(memo_list));
        },
        sync_form() {
            this.memo_list = JSON.parse(localStorage.getItem('memo_list')) || [
                {
                    title: 'title A',
                    content: 'AAAAAAAA',
                },
                {
                    title: 'title B',
                    content: 'BBBBBBBB',
                },
                {
                    title: 'title C',
                    content: 'CCCCCCC',
                },
            ];
        },
    },
    watch: {
        memo_list: {
            deep: true,
            handler: function(data) {
                this.sync_to(data);
            },
        },
    },
    created() {
        this.sync_form();
    },
});