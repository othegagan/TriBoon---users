import React, { useEffect, useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { SidebarContext } from "../context/SidebarContext";
import PageTitle from "../components/Typography/PageTitle";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { formatRelative } from 'date-fns';

const formatDate = date => {
    let formattedDate = '';
    if (date) {
        // Convert the date in words relative to the current date
        formattedDate = formatRelative(date, new Date());
        // Uppercase the first letter
        formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
};

const EditTicket = (props) => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();


    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, [location]);


    const [data, setData] = useState({});
    const [newStatus, setNewStatus] = useState();

    let proj = useParams();
    const { id } = proj;

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "tickets", id);
            const docSnap = await getDoc(docRef);
            const oldData = docSnap.data();
            setData(oldData);
        }
        fetchData();
    }, [id]);


    const handleAdd = async () => {
        try {
            await setDoc(doc(db, "tickets", id), {
                ...data,
                "status": newStatus,
                modifiedDate: serverTimestamp(),
            });
            window.location.replace('/home')
        } catch (err) {
            console.log(err.message);
        }
    };


    return (
        <>
            <div
                className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"
                    }`}
            >
                <Sidebar active="dashboard" />

                <div className="flex h-full flex-col flex-1 w-full">
                    <Header />
                    <div className="pl-6 pr-6 dark:bg-gray-900 bg-gray-50 pb-6 h-auto">
                        <div className="flex justify-between items-center">
                            <PageTitle>{props.title}</PageTitle>
                        </div>

                        <div className="my-5 md:mt-0 md:col-span-2 dark:bg-gray-800">
                            <div className="shadow overflow-hidden sm:rounded-md dark:bg-gray-800">

                                <div className=" grid grid-cols-6 gap-6 px-4 py-5 bg-white  dark:bg-gray-800  sm:p-6">
                                    <div className="col-span-6 sm:col-span-3">

                                        <div className="mb-3">
                                            <div className="block text-lg  font-bold text-gray-700  dark:text-white ">
                                                Ticket Title:{" "}
                                                <span className="dark:text-white ml-4 capitalize">
                                                    {data.title}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-3 w-3/4">
                                            <div className="block text-sm font-medium text-gray-700  dark:text-white ">
                                                Description :{" "}
                                                <span className="dark:text-white ml-4  text-base capitalize">
                                                    {data.description}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-3 w-3/4">
                                            <div className="block text-sm font-medium text-gray-700  dark:text-white ">
                                                Assigned To :
                                                <span className="dark:text-white ml-4  text-base">
                                                    {data.assignedTo}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-3 w-3/4">
                                            <div className="block text-sm font-medium text-gray-700  dark:text-white ">
                                                Type :
                                                <span className="dark:text-white ml-4  text-base">
                                                    {data.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="block text-sm font-medium text-gray-700  dark:text-white ">
                                                Created On :{" "}
                                                <span className="dark:text-white ml-4  text-base">
                                                    {
                                                        data.createdDate === undefined ?
                                                            ""
                                                            :
                                                            formatDate(new Date(data.createdDate.seconds * 1000))
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="block text-sm font-medium text-gray-700  dark:text-white ">
                                                Priority :{" "}
                                                <span className="dark:text-white ml-4  text-base">
                                                    {data.priority}
                                                </span>
                                            </div>
                                        </div>

                                        {data.modifiedDate &&
                                            <div className="mb-3">
                                                <div className="block text-sm font-medium text-gray-700  dark:text-white ">
                                                    Modified Date :{" "}
                                                    <span className="dark:text-white ml-4  text-base capitalize">
                                                        {
                                                            data.modifiedDate === undefined ?
                                                                ""
                                                                :
                                                                formatDate(new Date(data.modifiedDate.seconds * 1000))
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        }

                                        <div className="w-2/4 mb-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-white">
                                                Ticket Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                onChange={(e) => { setNewStatus(e.target.value) }}
                                                required
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm base:block  text-sm focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 "
                                            >
                                                {(data.status || "") === 'To Do' ? <option value="To Do" selected  >To Do</option> : <option value="To Do">To Do</option>}
                                                {(data.status || "") === 'In Progress' ? <option value="In Progress" selected>In Progress</option> : <option value="In Progress">In Progress</option>}
                                                {(data.status || "") === 'Done' ? <option value="Done" selected>Done</option> : <option value="Done">Done</option>}
                                            </select>
                                        </div>


                                        <button
                                            type="submit"
                                            onClick={handleAdd}
                                            className="inline-flex justify-center my-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        >Update Ticket
                                        </button>
                                    </div>


                                    {
                                        data.img &&
                                        <div className="col-span-6 sm:col-span-3 ">
                                            <img src={data.img} alt="ticket_image" />
                                        </div>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditTicket