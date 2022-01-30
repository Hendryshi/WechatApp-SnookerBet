Page({
    data:{
        show:false,
        columns:[1,2,3,4,5,6,7,8,9,10],
        score1:"-"
    },

    showPopup(e){
        this.setData({
            show:true
        })
    },

    onClose(){
        this.setData({
            show:false
        })
    },

    onConfirm(e){
        console.log("enter" + e)
        this.setData({
            score1:e.detail.value,
            show:false
        })
    }
})