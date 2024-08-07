"use client";
import axios from 'axios';
import { useState, useEffect } from 'react'


export default function TodoList({ url, token }) {
    const [newData, setNewData] = useState('');
    const [getData, setGetData] = useState([]);
    useEffect(() => {
        getTodo();
    }, []);
    // 查詢
    const getTodo = async () => {
        const res = await axios.get(`${url}/todos`, {
            headers: {
                Authorization: token,
            },
        })
        const updatedData = res.data.data.map(item => {
            return {
                ...item,
                updateStat: false
            }
        });
        setGetData(updatedData)

    }

    // 新增
    const addData = async () => {
        if (!newData) return;
        const res = await axios.post(`${url}/todos`,
            {
                content: newData
            }
            , {
                headers: {
                    Authorization: token,
                }
            })
            .then(function () {
                getTodo();
                setNewData('');
            })

    }

    // 刪除
    const removeData = async (id) => {
        const res = await axios.delete(`${url}/todos/${id}`
            , {
                headers: {
                    Authorization: token,
                }
            })
            .then(function () {
                getTodo();
            })

    }

    // 更新資料狀態
    const updatedStat = async (id) => {
        const upItem = getData.find((item) => item.id === id);
        const newStatus = !upItem.updateStat;
        setGetData(getData.map(item =>
            item.id === id ? { ...item, updateStat: newStatus } : item
        ));

        if (!newStatus) {
            console.log('可以更新');
            await axios.put(
                `${url}/todos/${id}`,
                { content: upItem.content },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
        }
    }

    // 更新資料內容
    const handleContentChange = (value, item) => {
        setGetData(getData.map(dataItem =>
            dataItem.id === item.id ? { ...dataItem, content: value } : dataItem
        ));
    };

    // 資料狀態
    const SatateData = async (id) => {
        const res = await axios.patch(`${url}/todos/${id}/toggle`,
            {}
            , {
                headers: {
                    Authorization: token,
                }
            })
            .then(function () {
                getTodo();

            })

    }
    return (<div className="mx-auto lg:w-[600px] md:w-full w-full px-3 py-5">

        <div className="my-5">
            <div className="text-3xl mb-3">Add</div>
            <div className="flex justify-between items-center shadow shadow-gray-400 p-5 mb-5">
                <div>
                    <input type="text" onChange={(e) => setNewData(e.target.value)} value={newData} className="border border-slate-400 "></input>
                </div>
                <div>
                    <button onClick={addData} className="bg-violet-500 py-1 px-3 rounded text-white ">新增</button>
                </div>
            </div>
        </div>

        <div className="my-5">
            <div className="text-3xl mb-3">TodoList</div>
            {
                getData.map((item, index) => {
                    if (!item.status) {
                        return (
                            <div key={index} className="flex justify-between items-center shadow shadow-gray-400 p-5 mb-5">
                                <div>
                                    {!item.updateStat && <p>{item.content}</p>}
                                    {
                                        item.updateStat && <div className="flex gap-2">
                                            <input type="text" onChange={(e) => { handleContentChange(e.target.value, item) }} value={item.content} className="border border-slate-400" ></input>
                                            <button onClick={() => updatedStat(item.id)} className="bg-violet-500 py-1 px-3 rounded text-white ">完成</button>
                                        </div>
                                    }

                                    {/* updatedData(item) */}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => SatateData(item.id)} className="bg-violet-500 py-1 px-3 rounded text-white ">確認</button>
                                    {!item.updateStat && <button onClick={() => updatedStat(item.id)} className="bg-violet-500 py-1 px-3 rounded text-white ">更新</button>}

                                    <button onClick={() => removeData(item.id)} className="bg-violet-500 py-1 px-3 rounded text-white ">刪除</button>
                                </div>
                            </div>
                        );
                    }

                })
            }

        </div>

        <div className="my-5">
            <div className="text-3xl mb-3">Check</div>
            {
                getData.map((item, index) => {
                    if (item.status) {
                        return (
                            <div key={index} className="flex justify-between items-center shadow shadow-gray-400 p-5 mb-5">
                                <div>
                                    <p>{item.content}</p>

                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => SatateData(item.id)} className="bg-violet-500 py-1 px-3 rounded text-white ">返回</button>
                                </div>
                            </div>
                        );
                    }

                })
            }

        </div>

    </div>)

}