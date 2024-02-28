"use client";
import Head from "./header/page";
import Sigup from "./signup/page";
import Login from "./login/page";
import TodoList from "./todoList/page";
import { useState } from 'react'


export default function Home() {
  const url = 'https://todolist-api.hexschool.io';

  const [memberInOut, setMemberInOut] = useState(false);
  const [member, setMember] = useState('');
  const [token, setToken] = useState();
  console.log(memberInOut);
  return (
    <div>
      <Head url={url} member={member} setMember={setMember} token={token} setToken={setToken} memberInOut={memberInOut} setMemberInOut={setMemberInOut}/>
      
      <div className={`lg:flex lg:justify-center lg:items-center lg:gap-10 mt-20 ${memberInOut ? 'hidden': null}`} >
        <Sigup url={url} />
        <Login url={url} setMember={setMember} setToken={setToken} setMemberInOut={setMemberInOut} />
      </div>
      {token && <TodoList url={url} token={token} />}
    </div>
  );
}
