"use client";
import axios from 'axios';
export default function Head({ url, member, token,memberInOut ,  setMemberInOut , setToken }) {
    const sigout = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/users/sign_out`, {}, {
                headers: {
                    Authorization: token
                }
            })
            console.log(res);
            setMemberInOut(false);
            setToken('');
        } catch (error) {
            console.log(error);
            // alert(error.response.data.message)
        }
    }
    return (
        <div className="bg-violet-500">
            <div className="mx-auto lg:w-[1200px] md:w-full w-full px-3 xl:px-0 text-white flex justify-between items-center py-2 ">
                <span>Kyrie-TodoList</span>
                <div className={!memberInOut ? 'hidden' : null}>
                    <span>Hi Kyrie</span>
                    <button className="border mx-2 px-1 py-1" onClick={sigout}>SignOut</button>
                </div>

            </div>
        </div>

    );
}
