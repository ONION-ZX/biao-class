<script>
  import api        from '../lib/api';
  import AdminNav   from '../components/AdminNav.vue';
  import Nav        from '../components/Nav.vue';
  import Pagination from '../components/Pagination.vue';
  import Footer   from '../components/Footer.vue';
  import Dropdown from '../components/Dropdown.vue';
  import Location  from "../components/Location";

  import validator from '../directive/validator';

  export default {
    directives: {validator},
    components : { AdminNav, Nav, Pagination, Footer, Dropdown, Location },
    mounted () {
      this.read();
    },
    data () {
      return {
        total        : 0,
        last_page    : 0,
        current_page : 1, 
        keyword      : '', 
        show_form    : false, 
        current      : {},
        list         : [],
        limit        : 3,
        model        : null,
      };
    },
    methods    : {
      
      on_page_change (page) {
        this.read(page);
      },

      cou (e) {
        e.preventDefault();

        let action = this.current.id ? 'update' : 'create';

        api(`${this.model}/${action}`, this.current)
          .then(() => {
            this.current = {};
            this.read();
          });
      },

      read (page = 1) {
        if (page == this.current_page && page != 1)
          return;

        api(`${this.model}/read`, { limit : this.limit, page : page,
           with: this.with })
          .then(r => {
            this.total        = r.total;
            this.list         = r.data;
            this.last_page    = r.last_page;
            this.current_page = r.current_page;
          });
      },

      remove (id) {
        if (!confirm('确定删除？'))
          return;

        api(`${this.model}/delete`, { id })
          .then(() => {
            this.read();
          });
      },

      set_current (row) {
        this.current   = row;
        this.show_form = true;

        if(this.after_set_current)
          this.after_set_current();
      },
      update(row) {
        this.current = row;
        this.show_form = true;
        this.$nextTick(() => {
          this.$refs.edit_design.on_edit(row.$design);
          this.$refs.edit_brand.on_edit(row.$brand);
        });
      },
      is_update() {
        return !!this.current.id;
      },

      search (e) {
        e.preventDefault();

        let param = {
          or : {},
        };

        this.searchable.forEach((prop) => {
          param.or[prop] = this.keyword;
        });

        api(`${this.model}/search`, param)
          .then(r => {
            this.list = r.data;
          });
      },
    },
  };
  </script>

  <style>
      .error {
        height: 35px;
        font-size: 13px;
        background:#f5a6a6;
        color:brown;
        padding: 10px;
        margin-bottom: 10px;
    }
  </style>
