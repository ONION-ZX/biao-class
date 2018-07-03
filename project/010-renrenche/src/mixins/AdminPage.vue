<script>
  import api        from '../lib/api';
  import AdminNav   from '../components/AdminNav.vue';
  import Nav        from '../components/Nav.vue';
  import Pagination from '../components/Pagination.vue';
  import Footer   from '../components/Footer.vue';

  export default {
    components : { AdminNav, Nav, Pagination, Footer },
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
           with: [
            { model: "brand", type: "has_one" },
            { model: "design", type: "has_one" }
            ]
         })
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
