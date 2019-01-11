const paginationBev = Behavior({
  data:{
    dataArray:[],
    total:null,
    isBottom:false,
    noneResult:false
  },
  methods:{
    setMoreData(dataArray){
      const temArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray : temArray
      })
    },
    getCurrentStart(){
      return this.data.dataArray.length
    },
    hasMore(){
      const length = this.getCurrentStart()
      let resultHasMore = true
      if(length >= this.data.total){
        resultHasMore = false
      }
      this.setData({
        isBottom: !resultHasMore
      })
      console.log(this.data.isBottom)
      return resultHasMore
    },
    setTotal(total){
      this.setData({
        total: total
      })
      if(total == 0){
        this.setData({
          noneResult:true
        })
      }
    },
    initialize(){
      this.setData({
        dataArray:[],
        noneResult: false,
        isBottom:false
      })
      this.data.total = null
    }
  }
})

export { paginationBev}