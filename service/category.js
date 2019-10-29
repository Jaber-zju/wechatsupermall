import request from './network.js'

export function getCategory() {
  return request({
    url: 'http://123.207.32.32:8000/api/v1/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: 'http://123.207.32.32:8000/api/v1/subcategory',
    data: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: 'http://123.207.32.32:8000/api/v1/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}