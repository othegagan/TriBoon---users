import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";



const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // const [user, setUser] = useState({});
    const [dbtickets, setdbtickets] = useState()
    const [ticketsAssigned, setTicketsAssigned] = useState()
    const [priorityCount] = useState([])
    const [statusCount] = useState([])

    const getUserDetails = () => {
        const currentUser = localStorage.getItem("currentUser");
        const parsedUser = currentUser ? JSON.parse(currentUser) : [];
        return parsedUser
    }



    const logout = () => {
        localStorage.removeItem('currentUser');
    };

    useEffect(() => {

        const user = getUserDetails()
        try {
            const q = query(collection(db, 'tickets'), where("assignedTo", "==", (user.displayName + "  (" + user.unique_id + ")")))

            onSnapshot(q, (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                    priorityCount.push(doc.data().priority);
                    statusCount.push(doc.data().status);
                });
            },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err.message);
        }
        // eslint-disable-next-line
    }, [priorityCount,statusCount])

    useEffect(() => {
        onSnapshot(collection(db, "tickets"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                    // eslint-disable-next-line
                });
                setdbtickets(list);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    useEffect(() => {
        const user = getUserDetails()
        try {
            const q = query(collection(db, 'tickets'), where("assignedTo", "==", (user.displayName + "  (" + user.unique_id + ")")))

            onSnapshot(q,
                (snapShot) => {
                    let list = [];
                    snapShot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    setTicketsAssigned(list);
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }, []);



    const pCount = () => {
        const c = [priorityCount.filter(x => x === "Low").length, priorityCount.filter(x => x === "Medium").length, priorityCount.filter(x => x === "High").length]
        return (c);
    }

    const sCount = () => {
        const c = [statusCount.filter(x => x === "To Do").length, statusCount.filter(x => x === "In Progress").length, statusCount.filter(x => x === "Done").length]
        return (c);
    }




    function formatedDate() {
        const months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "June",
            6: "July",
            7: "Aug",
            8: "Sept",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const d = new Date();
        const year = d.getFullYear();
        const date = d.getDate();
        const monthName = months[d.getMonth()];
        const dayName = days[d.getDay()];

        const formatted = `${dayName}, ${date} ${monthName} ${year}`;
        return formatted.toString();
    }

    return (
        <UserContext.Provider
            value={{ logout, formatedDate, getUserDetails, dbtickets, ticketsAssigned , pCount, sCount}}
        >
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
