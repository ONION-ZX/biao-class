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
                <div class="price">$6.34万</div>
                <div class="loan row">
                    <span class="col pay-three"></span>
                    <div class="col right">
                        <div class="row">
                            <div class="back left">1.9万开回家</div>
                            <div class="loan right">贷款详情</div>
                        </div>
                        <div class="row">
                            <div class="discount">金融购车可享服务费折扣</div>
                            <span calss="loan-limit">测测贷款额度</span>
                        </div>
                    </div>
                </div>
                <div class="guarantee">
                    <div class="row">
                        <div class="col left">
                            <span>保卖尊享</span>
                            <span>服务费不超过8%,详情到店咨询</span>
                        </div>
                        <div class="col right">查看详情</div>
                    </div>
                    <div class="row">
                        <div class="col item">2年4万公里保障</div>
                        <div class="col item">2年4万公里保障</div>
                        <div class="col item">2年4万公里保障</div>
                        <div class="col item">2年4万公里保障</div>
                    </div>
                    <div class="row">
                        <div class="col item">2年4万公里保障</div>
                        <div class="col item">2年4万公里保障</div>
                        <div class="col item">2年4万公里保障</div>
                        <div class="col item">2年4万公里保障</div>
                    </div>
                    <div class="row">
                        <a class="order">预约看车</a>
                        <a class="dis">我要砍价</a>
                        <a class="consult">免费咨询</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="detail">
          <div class="desc">
              <h2>车辆详情</h2>
              <div class="row">
                  <div class="col left tell">
                      <h3>卖家-先生说车</h3>
                      <div class="content">爱车上牌时间是2016年6月，它也陪我走过3.51万公里。这车平时开得不多，因为家里还有一台车，所以这台用得少。掀背大空间，自己除了平时代步外，还经常要拉几件货，掀背开口大，再大件的都能装，非常实用。此车是我的个人一手，4S店提的新车。我这车到现在也没几年，正是好跑的时候，省去磨合的时间了。欢迎爱车之人随时来看车试车，觉着满意您再开走。</div>
                  </div>
                  <div class="col right procedure">
                      <h3>车辆手续信息</h3>
                      <ul> 
                          <li>年检到期时间</li> 
                          <li>商业险到期时间</li> 
                          <li>有无购车发票</li> 
                          <li>是否4S店保养</li> 
                      </ul>
                      <ul> 
                          <li>2020-06</li> 
                          <li>--</li> 
                          <li>有</li> 
                          <li>否</li> 
                      </ul>  
                      <ul>
                          <li>交强险到期时间</li> 
                          <li>过户次数</li> 
                          <li>车辆购置税完税证明</li> 
                          <li>有无改装</li> 

                      </ul>
                      <ul> 
                          <li>2019-06</li> 
                          <li>0次</li> 
                          <li>有</li> 
                          <li>无</li> 
                     </ul>                    
                  </div>
              </div>
          </div>
          <div class="appearance">
              <div class="row">
                    <div class="col left">
                        <img src="../assets/detail/outfit.jpg">
                    </div>
                    <div class="col right">
                        <img src="../assets/detail/thumbnail01.jpg">
                    </div>
              </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Nav from '../components/Nav';

  export default {
    components: {
      Nav,
    },
  };
</script>

<style scoped>
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