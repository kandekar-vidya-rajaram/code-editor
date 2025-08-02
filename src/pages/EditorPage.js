import React, { useState,useRef, useEffect } from 'react';
import Client from '../Components/Client';
import Editor from '../Components/Editor';
import { initSocket } from '../Socket';
import { Navigate, useLocation, useNavigate ,useParams} from 'react-router-dom';
import ACTIONS from '../Action';
import toast from 'react-hot-toast';


const EditorPage = () => {
  const socketRef=useRef(null);
  const location=useLocation();
  const {roomId} =useParams();
  const reactNavigator=useNavigate();

  useEffect(()=>{
    const init=async()=>{
      socketRef.current=await initSocket();
      socketRef.current.on('connect_error',(err)=>handleErrors(err));
       socketRef.current.on('connect_failed',(err)=>handleErrors(err));

      function handleErrors(e)
      {
        console.log('socket error',e);
        toast.error('socket connection failed,try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        username:location.state?.username,
      });
      socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>
      {
         if(username!== location.state?.username)
         {
               toast.success(`${username} joined the room`);
         }
         setClients(clients);
      })
    };
    init();

  },[]);

const [clients,setClients]=useState([]);

if(!location.state)
  {

  <Navigate to="/"/>
  }
  return (
    <div className='mainwrap'>
    <div className='aside'>
      <div className='asideinner'>
        <div className='logo'>
        <img className='logoimage'/>

        </div>
        <h3>Connected</h3>
        <div className='clientlist'>
          {
            clients.map((client=>(<Client key={client.socketId} username={client.username}/>)))
          }
        </div>
      </div>
      <button className='btn copybtn'>Copy Room ID</button>
      <button className=' btn leavebtn'>Leave</button>

    </div>
    <div className='editorwrap'>
    <Editor/>
    
    </div>
    </div>
  );
};

export default EditorPage
