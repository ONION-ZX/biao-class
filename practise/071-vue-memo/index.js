window.root = new Vue({
    el: '#root',
    data: {
        current: {},
        memo_list: [
            {
                title: 'title A',
                content: 'aaaa',
            },
            {
                title: 'title B',
                content: 'bbbb',
            },
            {
                title: 'title C',
                content: 'cccc',
            },
        ],
    },
    methods: {
        add() {
            this.current = {},
            this.memo_list.push(this.current);
        }
    },
});