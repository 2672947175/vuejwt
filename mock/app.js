// 引包
let express = require('express')
// 创建一个服务器
let app = express();
// 中间价都是函数 中间件都是通过use调用
let cors = require('cors')
app.use(cors())

let bodyParser = require('body-parser')
// 解析数据的中间件 解析json 数据
app.use(bodyParser.json())


let jwt = require('jsonwebtoken')
// 通过一定规则进行加密解密


// 在登录页面登录成功之后拿到token ，反问其他页面的时候发送一个请求来验证用户是否登录 通过携带的token 的方式 如果token 解密正确 说明用户已经登录如果token解密错误说明用户没有登录/登录已经过期
// 验证登录的接口 通过token来验证
 
app.post('/validata',(req,res)=>{
    let token = req.headers.authorization;
    // console.log(token)
    // 我们要对前段发送过来的token 进行验证 防止前段篡改 确保是服务端给前段的合法token
    // 验证token的合法性
    // 解密规则
    //  jwt.verify 验证函数 第一个参数token，第二个参数 解密的规则 需要和加密一样 第三个参数cb（err,decode） err解密失败 decode 解密的对象{user:lili}

    jwt.verify(token,'芝麻开门',function(err,decode){
        // 如果token不合法
        if(err){
            res.json({
                msg:'用户未登录'
            })
        }else{
            // token 合法 需要延长过期时间(重新再给前段发个token )
            res.json({
                token:jwt.sign({nickname:decode.nickname},'芝麻开门',{
                    expiresIn:'120s',
                }),
                nickname:decode.nickname
            })
        }
    })
    // 每一次进行新建的接口要send 测试一下
    // res.send('123')
})


// 登录接口
app.post('/login',(req,res)=>{
    console.log(req.body)
    let {user} = req.body;
    // 假设 登录成功 登录成功给前段返回一个加密的token
    res.json({
        // 假设登录成功 登录成功之后给前端返回一个加密的token
        // 加密规则
        // jwt.sign({你要加密的对象},'加密的规则',配置) 常用的配置expiresIn 过期时间
        //jwt.sign 加密函数 参数第一个 对象 你要加密的对象  第二个参数加密的规则 第三个配置 常用的expiresIn 过期时间
        token:jwt.sign({nickname:'张三'},'芝麻开门',{
            expiresIn:'120s'//过去时间
        }),
        nickname:'张三'
    })
    user
    // 测试
    // res.send('123hahaddsss')
})




// 创建一个端口
app.listen(3000,()=>{
    console.log('服务器启动3000')
})