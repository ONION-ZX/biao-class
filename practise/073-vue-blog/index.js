let Home = Vue.component('home',{
    template: `<div><h1>Home</h1></div>`,
    data: function() {
        return {};
    },
});

let About = Vue.component('about',{
    template: `<div><h1>我叫王花花</h1> <button @click="alert()">Yo</button></div>`,
    methods: {
        alert: function(){
            alert('yo');
        },
    },
    data: function() {
        return {};
    },
});

new Vue({
    el: '#root',
    data: {},
    methods: {},
    router: new VueRouter({
        routes: [
            {path: '/home', component: Home},
            {path: '/about', component: About},
        ],
    }),
});
