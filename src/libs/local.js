
let util = {
    setlocal:(key,value)=>{
        localStorage[key]=JSON.stringify(value)
    },
    getlocal: (key)=>{
        console.log(localStorage[key]!=undefined&&localStorage[key]!='undefined')
        if(localStorage[key]!=undefined&&localStorage[key]!='undefined'){
            return JSON.parse(localStorage[key])
        }
         
    }
}
export default util