const Home = Vue.component('Home',{
    template: `
    <div>
        <h1>欢迎来到背背山吃饭大学</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ipsa minima placeat! A ad animi asperiores aut dolores facere illum iste laudantium maxime neque numquam odit, omnis quia, reprehenderit veritatis!</p>
    </div>
    `,
});

const Admin = Vue.component('admin',{
    template: `
    <div class="admin row">
    <div class="col-lg-3 nav">
        <router-link to="/admin/table">桌号管理</router-link>
        <router-link to="/admin/dish">菜品管理</router-link>
    </div>
    <div class="col-lg-9 main">
        <router-view></router-view>
    </div>
    </div>
    `,
});

const AdminDish = Vue.component('admin-dish',{
    template:`
    <div>
        <h2>菜品管理</h2>
        <div class="tool-set">
            <button @click="show_form">
                <span v-if="show_form">取消</span>创建菜品
            </button>
        </div>

        <form @submit="create($event)" novalidate>
            <div v-if="error.length" class="error">
                <div v-for="e in error">{{e}}</div>
            </div>
            <div class="input-wrap">
                <label>菜名</label>
                <input type="text" v-model="current.name">
            </div>
            <div class="input-wrap">
                <label>价格</label>
                <input type="number" v-model="current.capacity">
            </div>
            <div class="input-wrap">
                <label>描述</label>
                <textarea v-model="current.description"></textarea>
            </div>
            <div class="input-wrap">
                <label>封面地址</label>
                <textarea v-model="current.cover_url"></textarea>
            </div>
            <div class="input-wrap">
                <button></button>
            </div>
        </form>

        <table class="list">
            <thead>
            <tr>
            <th>菜名</th>
            <th>价格</th>
            <th>描述</th>
            <th>封面</th>
            <th>操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="row in list">
                <td>{{row.name}}</td>
                <td>{{row.price}}</td>
                <td>{{row.description || '-'}}</td>
                <td>
                    <img v-if="row.cover_url" src="row.cover_url" :src="row.cover_url" :alt="row.name">
                    <span class="empty-holder" v-else>暂无封面</span>
                </td>
                <td>
                    <button @click="current=row">更新</button>
                    <button @click="remove(row.id)">删除</button>
                </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="empty-holder">暂无内容</div>
    </div>
    `,

    data() {
        return {
            validate_props: ['name','price','cover_url','description'],
            current: {},
            list: [],
            error: [], //验证失败的错误信息
            show_form: false, //是否显示表单
        }
    },

    methods: {
        create(e) {
            e.preventDefault();

            if (!this.validate())
                return;

            let is_update = this.current.id;
            let action = is_update ? 'update' : 'create';

            http
                .post(`dish/${action}`, this.current)
                .then(r => {
                    if (r.data.success) {
                        this.current = {};
                        if (!is_update)
                            this.list.push(r.data.data);
                    }
                });
        },
        remove(id) {
            if (!confirm('确定要删除吗?'))
                return;

            http
                .post('dish/delete', { id })
                .then(r => {
                    if (r.data.success) {
                        util.delete_element_by_id(this.list, id);
                    }
                });
        },

        validate(row) {
            row = row || this.current;

            this.error = [];

            this.validate_props.forEach(prop => {
                let r = this['validate_' + prop];
                if (r === true)
                    return true;

                this.error.push(r);
            });

            return !this.error.length;
        },

        validate_name(value) {
            value = value || this.current.name;
            const MAX_LENGTH = 255;
            if(!value)
                return '菜名为必填项';
            if(value.length >= MAX_LENGTH)
                return `菜名最大长度为${MAX_LENGTH}`;
            return true;
        },

        validate_price(value) {
            value = value || this.current.price;
            if(value === '' || value === undefined || value < 0 || value > 1000000)
                return '不合法的价格!';
            return true;
        },

        validate_description(value) {
            value = value || this.current.description;
            if(!value)
                return true; //可为空
            const MAX_LENGTH = 10000;

            if(value.length > MAX_LENGTH)
                return `此项最大长度为${MAX_LENGTH}`;
            
            return true;
        },

        validate_cover_url(value) {
            value = value || this.current.cover_url;
            let re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

            if(!value)
                return true;
            if(!re.test(value))
                return `不合法的地址`;
            return true;
        },
    },

    mounted() {
        http
            .post('dish/read')
            .then(r => {
                this.list = r.data.data;
            });
    },
});

const AdminTable = Vue.component('admin-table',{
    template:  `
    <div>
        <h2>桌号管理</h2>
        <form @submit="create($event)">
            <div v-if="error.length" class="error">
                <div v-for="e in error">{{e}}</div>
            </div>
            <div class="input-wrap">
                <label>桌号</label>
                <input type="text" v-model="current.name">
            </div>
            <div class="input-wrap">
                <label>座位数</label>
                <input type="number" v-model="current.capacity">
            </div>
            <div class="input-wrap">
                <button>提交</button>
            </div>
        </form>

        <table class="list">
            <thead>
            <tr>
            <th>桌号</th>
            <th>座位数</th>
            <th>操作</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="row in list">
                <td>{{row.name}}</td>
                <td>{{row.capacity}}</td>
                <td>
                    <button @click="current=row">更新</button>
                    <button @click="remove(row.id)">删除</button>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
    `,
    data() {
        return {
            validate_props: ['name','capacity'],
            error: [],
            current: {},
            list: [],
        };
    },
    methods: {
        create(e) {
            e.preventDefault();

            if(!this.validate())
                return;
            
                let is_update = this.current.id;
                let action = is_update ? 'update' : 'create';

                http
                    .post(`table/${action}`,this.current)
                    .then(r => {
                        if(r.data.success) {
                            this.current = {};
                            if(!is_update)
                                this.list.push(r.data.data);
                        }
                    });
        },
        remove(id) {
            if(!confirm('确定要删除吗?'))
                return;

            http
                .post('table/delete',{id})
                .then(r => {
                    if(r.data.success) {
                        util.delete_element_by_id(this.list, id);
                    }
                });
        },

        validate(row) {
            row = row || this.current;
            
            this.error = [];

            this.validate_props.forEach(prop => {
                let r = this['validate_' + prop];
                if(r === true)
                    return true;

                this.error.push(r);
            });

            return !this.error.length;
        },

        validate_name(value) {
            value = value || this.current.name;
            const MAX_LENGTH = 255;
            if(!value)
                return '桌号为必填项';
            if(value.length >= MAX_LENGTH)
                return `此项最大长度为${MAX_LENGTH}`;
            return true;
        },

        validate_capacity(value) {
            value = value || this.current.capacity;

            if(!value)
                return '座位为必填项';

            if(value < 1 || value > 1000000)
                return '不合法的座位数';
            return true;
        },
    },

    mounted() {
        http
            .post('table/read')
            .then(r => {
                this.list = r.data.data;
            });
    },
});

new Vue({
    el: '#root',
    router: new VueRouter({
        routes: [
            {
                path: '/',
                component: Home,
            },
            {
                path: '/admin/',
                component: Admin,
                children: [
                    {
                        path: 'table',
                        component: AdminTable,
                    },
                    {
                        path: 'dish',
                        component: AdminDish,
                    },
                ],
            },
        ],
    }),
});