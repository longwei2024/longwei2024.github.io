const request = (url ,data)=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"get",
            data,
            url,
            success(content){
                resolve(content)
            }
        })
    })
}
const search = (keywords)=>{
    return request("https://apis.netstart.cn/music/search",{keywords} )
}