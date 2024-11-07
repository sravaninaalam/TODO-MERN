import React from 'react'
import { useEffect,useState } from 'react'
import './App.css'

const App = () => {
  const[iptodo,setIpTodo]=useState('')
  const[todos,setTodos]=useState([])
  const[isedit,setIsedit]=useState(null)
  useEffect(()=>{
    getTodos()
    // axios.get('http://localhost:5000/').then((response) => {
      // console.log(response.data);
    // });
    // fetch('http://localhost:5000/').then(res=>res.json()).then(data=>console.log(data))
    

  },[iptodo])
  async function getTodos(){
      const res=await fetch('http://localhost:4000/')
      const data=await res.json()
      setTodos(data)
      // console.log(data)
  }
  function handleDelete(id){
      fetch(`https://todo-mern-668f.onrender.com/delete/${id}`,{
        method:'DELETE',
      }).then(res=>res.json()).then(data=>setTodos(data))
  }
  function handleSubmit(e){
    e.preventDefault()
    if(iptodo && isedit){
       fetch(`https://todo-mern-668f.onrender.com/edit/${isedit}`,{
          method:'PUT',
          headers:{
            "Content-Type":'application/json',
          },
          body:JSON.stringify({todo:iptodo})
      }).then(res=>res.json()).then(data=>setTodos(data))
    
      setIsedit(null)

    }
   else if(iptodo){
      //  axios.post("http://localhost:5000/addTodo",{todo:iptodo}).
      // then(res=>console.log(res.data))
      fetch("https://todo-mern-668f.onrender.com/addTodo",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({todo:iptodo})
      }).then(res=>res.json()).then(data=>setTodos(data))
   }
   setIpTodo('')
  }
 async function handleEdit(id){
      const edit=todos.find(item=>item._id===id)
      setIpTodo(edit.todo)
      setIsedit(id)
  }
  
  
  return (
    <div className='App'>
        <form onSubmit={handleSubmit}> 
            <input type='text' placeholder='enter todo' value={iptodo} onChange={(e)=>setIpTodo(e.target.value)}/>

            <button>ADD TODO</button>
        </form>
         {todos&& todos.map(item=><div key={item._id} className='todo'>
         
         <h2>{item.todo}</h2>
         <div >
              <button onClick={()=>handleDelete(item._id)}>delete</button>
             <button style={{backgroundColor:'yellow',padding:'5px 5px',margin:'10px'}}
             onClick={()=>handleEdit(item._id)}>Edit</button>
         </div>

         </div>)} 

    </div>
  )
}

export default App
