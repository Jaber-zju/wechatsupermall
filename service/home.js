import request from './network.js'

export function getMuitiData(){
  return request({
    url: 'http://123.207.32.32:8000/api/v1/home/multidata'
  })
}

export function getGoodsData(type, page){
  return request({
    url: 'http://123.207.32.32:8000/api/v1/home/data',
    data: {
      type,
      page
    }
  })
}