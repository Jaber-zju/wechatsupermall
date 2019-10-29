// pages/category/category.js
import { getCategory ,
         getSubcategory,
         getCategoryDetail
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    categoryData: {},
    currentIndex: 0,
    subcategories: [],
    categoryDetail: []


  },

//--------------------事件监听函数--------------------------
  titleClick(event){
    const index = event.detail.index
    this.setData({
      currentIndex : index
    })

    this._getSubcategory(this.data.currentIndex);
    this._getCategoryDetail(this.data.currentIndex)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory()
    this._getSubcategory(this.data.currentIndex)
    this._getCategoryDetail(this.data.currentIndex)

  },
  //------------------------------------网络请求----------------------------

  _getCategory(){
    getCategory().then(res => {
      //console.log(res)
      const categories = res.data.data.category.list
      const maitkey = categories[this.data.currentIndex].maitKey;
      const miniWallKey = categories[this.data.currentIndex].miniWallkey;
      //console.log(maitkey)
      // 2.初始化每个类别的子数据
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        categories: categories,
        categoryData: categoryData
      })

      // 4.请求第一个类别的数据
      this._getSubcategory(0)
      // 5.请求第一个类别的详情数据
      this._getCategoryDetail(0)
    })
  },

  _getSubcategory(currentIndex) {
    // 2.请求的数据
    getSubcategory(this.data.maitKey).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },

  _getCategoryDetail(currentIndex) {

    // 2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, this.data.miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },

  _getRealCategoryDetail(currentIndex, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      // 1.获取categoryData
      const categoryData = this.data.categoryData;

      // 2.修改数据
      categoryData[currentIndex].categoryDetail = res;

      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})