window.root =new Vue({
    el: '#root',
    data: {
        current : null,
        memo_list : [],
    },
    methods: {
        add() {
            let is_update = !!this.current.id;
            let api = is_update ? 'update' : 'create';

            http
                .post(`memp/${api}`, this.current)
                .then((res) => {
                    let new_row = res.data.data;
                    this.current = new_row;

                    if(!is_update)
                        this.memo_list.push(new_row);
                });
        },
        remove(id, e) {
            http
                .post('memo/delete', {id})
                .then((res) => {
                    this.sync_form();
                });
                e.stopPropagation();
        },
        sync_form() {
            http
                .post('memo/read', {
                    limit: 5,
                    where: {
                        or: [
                            ['id', '>', 5],
                        ],
                    },
                })
                .then((res) => {
                    this.memo_list = res.data.data;
                });
            // this.memo_list = JSON.parse(localStorage.getItem('memo_list')) || [
            //     {
            //         title: 'title A',
            //         content: 'AAAAAAAA',
            //     },
            //     {
            //         title: 'title B',
            //         content: 'BBBBBBBB',
            //     },
            //     {
            //         title: 'title C',
            //         content: 'CCCCCCC',
            //     },
            // ];
        },
        init_current() {
            this.current = {};
        },
    },
    // watch: {
    //     memo_list: {
    //         deep: true,
    //         handler: function(data) {
    //             this.sync_to(data);
    //         },
    //     },
    // },
    created() {
        this.sync_form();
    },
});