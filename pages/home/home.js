// pages/home/home.js
import { getMuitiData } from '../../service/home.js'
import { getGoodsData } from '../../service/home.js'


Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends : [],
    titles: ['流行','新款','精选'],
    currentType: 'pop',
    goods: {
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] },
    },
    isShowBacktop:false,
    isShowTabcontrol:false,
    tabScrollTop:0,


  },
//----------------------------事件监听函数----------------------
  tabClick(event){
    let currentType = ''
    const index = event.detail.index
    //console.log(index)
    switch (index) {
      case 0:
        currentType = 'pop'
        break
      case 1:
        currentType = 'new'
        break
      case 2:
        currentType = 'sell'
        break
    }
    this.setData({
      currentType: currentType
    })
    //console.log(this.data.currentType)
    
    wx.createSelectorQuery().select('#tabcontrol1').currentIndex = index
    wx.createSelectorQuery().select('#tabcontrol2').currentIndex = index
    
  },

  imageLoad(){
    wx.createSelectorQuery().select('#tabcontrol2').boundingClientRect(rect => {
     // console.log(rect)
      this.data.tabScrollTop = rect.top
    }).exec()
  },


  /**
   * ---------------------------生命周期函数-------------------------------
   */
  onLoad: function (options) {

      this._getMuitiData()
      this._getGoodsData('pop')
      this._getGoodsData('new')
      this._getGoodsData('sell')

  },
  onReachBottom(){
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options){
    const scrollTop = options.scrollTop
    const flag1 = scrollTop >= 1000
    if(flag1 != this.data.isShowBacktop){
      this.setData({
        isShowBacktop:scrollTop >= 1000
      })
    }

    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isShowTabcontrol){
      this.setData({
        isShowTabcontrol:scrollTop >= this.data.tabScrollTop
      })
    }
  },


//------------------------------网络请求---------------------------------
  _getMuitiData(){
    getMuitiData().then(res => {
      //console.log(res)
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      //console.log(banners)
      //console.log(recommends)
      this.setData({
        banners: banners,
        recommends: recommends
      })
    })
  },

  _getGoodsData(type){
    //获取页码
      const page = this.data.goods[type].page + 1

      //发送网络请求
      getGoodsData(type, page).then(res => {
        //console.log(res);
        //1.取出数据
        const list = res.data.data.list;

        // 2.将数据临时获取
        const goods = this.data.goods;
        goods[type].list.push(...list)
        goods[type].page += 1;

        // 3.最新的goods设置到goods中
        this.setData({
          goods: goods
        })

        // const oldList = this.data.goods[type].list
        // oldList.push(...list)

        // //将数据设置到data中的goods中
        // const typeKey = 'goods.$(type).list';
        // const pageKey = 'goods.$(type).page'
        // this.setData({
        //   [typeKey] : oldList,
        //   [pageKey] : page 
        // })
      })
    
  }



  

  
})