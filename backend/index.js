const express=require('express')
const mongoose=require('mongoose')
const TODO=require('./model')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors({origin:'*'}))
mongoose.connect( "mongodb+srv://nalamsravani:nalamsravani@cluster0.x9kmw.mongodb.net/").then(
    ()=>console.log("DB success")).catch(err=>console.log(err))

app.post('/addTodo',async(req,res)=>{
    const {todo}=req.body
    const newtodo=new TODO({todo})
    await newtodo.save()
    return res.json(await TODO.find())
})
app.get('/',async(req,res)=>{
    return res.json(await TODO.find() )
})

app.put('/edit/:id',async(req,res)=>{
    const {todo}=req.body
    try{
     await TODO.findByIdAndUpdate(req.params.id,{todo})
        return res.json(await TODO.find())
    }
    catch(err){
        console.log(err)
    }
})
app.delete('/delete/:id',async(req,res)=>{
    try{
        await TODO.findByIdAndDelete(req.params.id)
        return res.json(await TODO.find())
    }
    catch(err){
        console.log(err)
    }
})
app.listen(4000,()=>console.log("running"))
// const express=require('express')
// const mongoose=require('mongoose')
// const TODO=require('../../model')
// const cors=require('cors')
// const app=express()

// app.use(express.json())
// app.use(cors({
//     origin:'*'
// }))
// mongoose.connect(
//     "mongodb+srv://nalamsravani:nalamsravani@cluster0.x9kmw.mongodb.net/"
// ).then(()=>{console.log("DB connection was succesfull")}).catch(err=>console.log(err))

// app.post('/addTodo',async(req,res)=>{
//     const {todo}=req.body
//     const newtodo=new TODO({todo})
//     await newtodo.save()
//     return res.json(await TODO.find())
// })
// app.get('/',async(req,res)=>{
//     return res.json(await TODO.find() )
// })
// app.put('/edit/:id',async(req,res)=>{
//     // console.log("consoling",req)
//     const {todo}=req.body
//     try{
//      await TODO.findByIdAndUpdate(req.params.id,{todo})
//         return res.json(await TODO.find())
//     }
//     catch(err){
//         console.log(err)
//     }
// })
// app.delete('/delete/:id',async(req,res)=>{
//     try{
//         await TODO.findByIdAndDelete(req.params.id)
//         return res.json(await TODO.find())
//     }
//     catch(err){
//         console.log(err)
//     }
// })

// app.listen(6000,()=>console.log("server is on live"))