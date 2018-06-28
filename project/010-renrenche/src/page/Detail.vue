<template>
  <div>
    <Nav/>
    <div class="container">
      <div class="bread">
          <a>西安二手车 > </a>
          <a>西安二手车 > </a>
          <a>西安二手车 > </a>
          <a>西安二手车 > </a>
          <a>西安二手车</a>
      </div>
      <div class="row preview">
        <div class="row top">
            <div class="col left">
                <!-- <h2>长安-CS85 2018款 尚酷版 1.5T 自动锋悦型</h2> -->
                <!-- <div class="tag_bar">
                    <div class="tag">超值</div>
                    <div class="tag">准新车</div>
                    <div class="tag">零过户</div>                    
                </div> -->
            </div>
            <div class="col right">
                <div class="search">
                    <input type="text" placeholder="请输入关键词">
                    <div class="search-btn">search</div>
                </div>
            </div>
        </div>
        <div class="row main">
            <div class="col left">
                <div class="row">
                    <img src="../assets/detail/thumbnail01.jpg">
                </div>
                <div class="row">

                </div>
                <div class="row thumbnails">
                    <img src="../assets/detail/thumbnail01.jpg">
                    <img src="../assets/detail/thumbnail01.jpg">
                    <img src="../assets/detail/thumbnail01.jpg">
                    <img src="../assets/detail/thumbnail01.jpg">
                </div>
            </div>
            <div class="col right">
                <h2>长安-CS85 2018款 尚酷版 1.5T 自动锋悦型</h2>
                <div class="vehicle-info row">
                    <div class="item">
                        <span class="content">2009-06</span>
                        <span class="desc">上牌时间</span>
                    </div>
                    <div class="item">
                        <span class="content">2009-06</span>
                        <span class="desc">上牌时间</span>
                    </div>
                    <div class="item">
                        <span class="content">2009-06</span>
                        <span class="desc">上牌时间</span>
                    </div>
                    <div class="item">
                        <span class="content">2009-06</span>
                        <span class="desc">上牌时间</span>
                    </div>
                    <div class="item">
                        <span class="content">2009-06</span>
                        <span class="desc">上牌时间</span>
                    </div>
                </div>
                <div class="row">
                    <div class="price">
                        <span>车主报价</span>
                        <h3>$3.20万</h3>
                    </div>
                </div>
                <div class="row service">
                    
                </div>
            </div>
        </div>
      </div>
      <div class="detail">
          <div class="desc">
              <h3>车辆详情</h3>
              <div class="row">
                  <div class="col left tell"></div>
                  <div class="col right procedure"></div>
              </div>
          </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Nav from '../components/Nav';
  import Footer from '../components/Footer';

  export default {
    components: {
      Nav,
      Footer,
    },
  };
</script>

<style scoped>
    body {
        background: #fff;
    }

    .bread {
        padding: 15px 0 15px 0;
    }

    .bread a{
        cursor: pointer;
        font-size: 8px;
        color:darkgray;
    }

    .top .right {
        padding-right: 10px;
        width: 30%;
    }

    .top .left {
        font-size: 0;
        width: 70%;
    }

    h2 {
        font-size: 25px;
        text-align: center;
    }

    h2,
    .top .left .tag_bar {
        display: inline-block;
        font-weight: normal;
        margin-top: 0;
    }

    .top .left .tag_bar {
        padding: 15px;
        padding-left: 0;
        font-size: 15px;
        width: 30%;
    }

    .top .left .tag_bar .tag {
        display: inline-block;
    }
    

    .top .right .search {
        display: inline-block;
        border: 1px solid #444;
    }

    .top .right .search div,
    .top .right .search input{
        border: 0;
        display: inline-block;
        padding: 5px;
    }

    .top .right .search input {
        border-right: 1px solid #444;
    }

    input::-webkit-input-placeholder {
        font-size: 8px;
        color:darkgray;
    }

    .main .left,
    .main .right {
        width: 50%;
        display: inline-block;
    }

    .main .thumbnails {
        margin-top: 10px;
    }

    .main .thumbnails img {
        display: inline-block;
        width: 24%;
        margin-right: 5px;
    }

    .main .right {
        padding-top: 15px;
        padding-left: 20px;
        text-align: left;
    }

    .main .right .vehicle-info .item {
        display: inline-block;
        width: 20%;
    }

    .main .right .vehicle-info .item span {
        display: block;
        text-align: center;
        margin-top: 5px;
    }

    .main .right .vehicle-info .item .content {
        font-size: 15px;
    }

    .main .right .vehicle-info .item .desc {
        font-size: 8px;
    }
</style>