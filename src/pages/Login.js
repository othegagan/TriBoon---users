import React, { useState } from 'react'

import { Label } from '@windmill/react-ui'
import Navbar from '../components/Navbar';
import {  db } from "../firebase";
import { query,  collection, where,  onSnapshot } from "firebase/firestore";


const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const q = query(collection(db, 'users'), where("email", "==", email), where("password", "==", password))

            onSnapshot(q,
                (snapShot) => {
                    let list = [];
                    snapShot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    if (list.length === 1) {
                        console.log("logged in")
                        localStorage.setItem("currentUser", JSON.stringify(list[0]));
                        window.location.replace('/home')
                    } else {
                        setError("Invaild credentials")
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    };


    return (
        <>
            <div className='h-screen bg-gray-50 dark:bg-gray-900'>
                <Navbar active="signup" />
                <div className="flex px-6  mt-12 mb-10 bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <main className="flex items-center justify-center px-4 py-12  dark:text-gray-200">
                            <div className="w-3/4">
                                <div className="mb-6 text-center">
                                <p>Welcome back!  <br /><span className="mb-4 ml-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login to your account</span></p>
                                </div>

                                {error &&
                                    <div className="flex flex-row items-center mb-5 bg-red-200 border-b-2 border-red-300 rounded alert">
                                        <div className="ml-4 alert-content">
                                            <div className="p-3 text-xs font-medium text-red-600 alert-description">
                                                {error}
                                            </div>
                                        </div>
                                    </div>
                                }

                                <form onSubmit={handleSubmit}>
                                    <Label>Email</Label>
                                    <input onChange={(e) => setEmail(e.target.value)}
                                        className="w-full mt-1 text-sm leading-5 base:block focus:outline-none dark:text-gray-300 form-input active:focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700" type="email" placeholder="yourname@gmail.com" />

                                    <Label className="mt-4">Password</Label>
                                    <input onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 text-sm leading-5 base:block focus:outline-none form-input active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700" type="password" placeholder="***************" />

                                    <button className="items-center justify-center w-full pt-2 pb-2 mt-10 text-base font-medium leading-5 text-white transition-colors bg-purple-600 rounded-lg cursor-pointer active:focus:border-purple-400"  >Log in</button>
                                </form>

                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>

    )
}

export default UserLogin
