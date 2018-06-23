// new Vue({
//     el: '#root',
//     data: {
//         rawHtml: `<span style="color:red">This should be red</span>`,
//     },
//     methods: {},
// });

new Vue({
    el: '#root',
    data: {
        message: 'message',
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('');
        },
    },
});