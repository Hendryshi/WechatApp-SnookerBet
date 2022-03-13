// components/dice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    i: 0
  },

  /**
   * 组件的方法列表
   * 点击dice可旋转色子
   */
  methods: {
    changeDice:function(){
      var j = 1;
      var second = 10;
      const timer = setInterval(()=>{
        if(second){
          j = j%6;
          j++;
          this.setData({
            i: j
          });
          second--;
        }else{
          clearInterval(timer);
          this.setData({
            i:0
          })
        }    
      }, 20)

      this.triggerEvent("ParentEvent");
    }
  }
})
