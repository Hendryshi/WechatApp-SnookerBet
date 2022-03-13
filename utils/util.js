const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute].map(formatNumber).join(':')}`
  return [month, day].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getLocaleDateFormat = function(dDate){
  //var language = wx.getSystemInfoSync().language.replace("_","-");
  var language = "fr-FR";
  return new Intl.DateTimeFormat(language,{month:"2-digit",day:"2-digit"}).format(new Date(dDate));
}

module.exports = {
  formatTime: formatTime
}
