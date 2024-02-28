"use client";
import Head from "../header/page";
import Link from "next/link";
import { useState } from 'react'
import axios from 'axios';
import {useRouter} from "next/navigation"

export default function Login({url , setMember , setToken , setMemberInOut}) {
    // const router = useRouter()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const sigin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/users/sign_in`, {
                email: email,
                password: password,
            })
            setToken(res.data.token)
            setMember(res.data.nickname)
            setMemberInOut(true)
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }
    return (
        <div>
            <form className="mx-auto w-[400px] py-10 px-5 h-[350px] shadow shadow-gray-400 rounded">
                <div className="mb-5 text-center text-2xl">登入</div>
                <div className="mb-5">
                    <label htmlFor="email" className="mr-2 w-1/6">信箱</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="w-5/6 border border-slate-400" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="mr-2 w-1/6">密碼</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="w-5/6 border border-slate-400" required />
                </div>
                <div className="text-center">
                    <input type="button" value="登入" onClick={sigin} className="border border-slate-400 py-1 px-6" />
                </div>

            </form>
        </div>
    );
}