import React, { useState, useEffect } from 'react'

import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, BugIcon, ProjectIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { UserAuth } from '../context/AuthContext'
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// import {
//     doughnutOptions,
//     lineOptions,
//     doughnutLegends,
//     lineLegends,
// } from '../utils/demo/chartsData'

function Dashboard() {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [usersCount, setUsersCount] = useState(null);
    const [projectsCount, setProjectsCount] = useState("");
    const { usersData } = UserAuth();
    const { roleCount } = UserAuth();



    // pagination setup
        // eslint-disable-next-line
    const resultsPerPage = 3
    const totalResults = usersData.length

    const role = roleCount()


    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }
    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setData(usersData.slice((page - 1) * resultsPerPage, page * resultsPerPage))
        // eslint-disable-next-line
    }, [page])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "users"),
            (snapShot) => {
                setUsersCount(snapShot.size)
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
        };
    }, []);


    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects",),
            (snapShot) => {
                setProjectsCount(snapShot.size)
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
        };
    }, []);



    const doughnutOptions = {
        data: {
            datasets: [
                {
                    data: [role[0], role[1]],
                    backgroundColor: ['#0694a2', '#1c64f2'],
                    label: 'Dataset 1',
                },
            ],
            labels: ['Developers', 'Testers'],
        },
        options: {
            responsive: true,
            cutoutPercentage: 80,
        },
        legend: {
            display: false,
        },
    }

    const doughnutLegends = [
        { title: 'Testers', color: 'bg-blue-500' },
        { title: 'Developers', color: 'bg-teal-600' },
    ]



    return (
        <>
            <PageTitle>Dashboard</PageTitle>

            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard title="Total Employees" value={usersCount}>
                    <RoundIcon
                        icon={PeopleIcon}
                        iconColorClass="text-orange-500 dark:text-orange-100"
                        bgColorClass="bg-orange-100 dark:bg-orange-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Total Projects" value={projectsCount}>
                    <RoundIcon
                        icon={ProjectIcon}
                        iconColorClass="text-green-500 dark:text-green-100"
                        bgColorClass="bg-green-100 dark:bg-green-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Total Bugs" value="0">
                    <RoundIcon
                        icon={BugIcon}
                        iconColorClass="text-blue-500 dark:text-blue-100"
                        bgColorClass="bg-blue-100 dark:bg-blue-500"
                        className="mr-4"
                    />
                </InfoCard>

                <InfoCard title="Features" value="0">
                    <RoundIcon
                        icon={ChatIcon}
                        iconColorClass="text-teal-500 dark:text-teal-100"
                        bgColorClass="bg-teal-100 dark:bg-teal-500"
                        className="mr-4"
                    />
                </InfoCard>
            </div>
            {/*
            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Client</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {data.map((user, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">

                                        <div>
                                            <p className="font-semibold">{user.displayName}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">$ {user.amount}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge type={user.status}>{user.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        label="Table navigation"
                        onChange={onPageChange}
                    />
                </TableFooter>
            </TableContainer> */}

            <PageTitle>Charts</PageTitle>
            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <ChartCard title="Users">
                    <Doughnut {...doughnutOptions} />
                    <ChartLegend legends={doughnutLegends} />
                </ChartCard>

                {/* <ChartCard title="Traffic">
                    <Line {...lineOptions} />
                    <ChartLegend legends={lineLegends} />
                </ChartCard> */}
            </div>
        </>
    )
}

export default Dashboard
