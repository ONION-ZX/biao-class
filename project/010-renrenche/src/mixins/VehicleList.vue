<script>
export default {
    methods: {
    get_thumbnail(row) {
      return row.preview && row.preview[ 0 ] && row.preview[ 0 ].url ?
             row.preview[ 0 ].url :
              'https://image1.guazistatic.com/qn180618155102242081e88c459a11926744030df0971b.jpg?imageView2/1/w/287/h/192/q/88';
    },
  },
}
</script>
