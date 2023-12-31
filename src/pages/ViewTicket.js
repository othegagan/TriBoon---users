import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { SidebarContext } from "../context/SidebarContext";
import PageTitle from "../components/Typography/PageTitle";
import { doc, getDoc } from "firebase/firestore";
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

const ViewTicket = (props) => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();


    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, [location]);


    const [data, setData] = useState({});

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


    return (
        <>
            <div
                className={`flex h-auto min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && "overflow-hidden"
                    }`}
            >
                <Sidebar active="tickets" />

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

                                        <div className="mb-3">
                                            <div className="block text-sm font-medium text-gray-700  dark:text-white ">
                                                Status :{" "}
                                                <span className="dark:text-white ml-4  text-base">
                                                    {data.status}
                                                </span>
                                            </div>
                                        </div>

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

                                        <Link to="/tickets">
                                            <button type="submit"
                                                className="inline-flex justify-center py-2 px-4  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                                Back
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3 ">
                                    <img src={data.img} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewTicket;
