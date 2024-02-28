"use client";
import Head from "../header/page";
import Link from "next/link";
import { useState } from 'react'
import axios from 'axios';
import {useRouter} from "next/navigation"


export default function Sigup({url}) {
  const router = useRouter()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nickname, setNickname] = useState();

  const sigup = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${url}/users/sign_up`, {
        email:email,
        password:password,
        nickname:nickname
      })
      setEmail('');
      setPassword('');
      setNickname('');
      alert('註冊成功，請登入!!!')
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  }

  return (
    <div>
      <form className="mx-auto w-[400px] py-10 px-5 h-[350px] shadow shadow-gray-400 rounded">
        <div className="mb-5 text-center text-2xl">註冊</div>

        <div className="mb-5">
          <label htmlFor="email" className="mr-2 w-1/6">信箱</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" className="w-5/6 border border-slate-400" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="mr-2 w-1/6">密碼</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" className="w-5/6 border border-slate-400" required />
        </div>
        <div className="mb-5">
          <label htmlFor="nickname" className="mr-2 w-1/6">名稱</label>
          <input type="text" onChange={(e) => setNickname(e.target.value)} value={nickname} name="nickname" id="nickname" className="w-5/6 border border-slate-400" required />
        </div>
        
        <div className="text-center">
          <input type="button" value="註冊" onClick={sigup} className="border border-slate-400 py-1 px-6" />
        </div>

      </form>
    </div>
  );
}
