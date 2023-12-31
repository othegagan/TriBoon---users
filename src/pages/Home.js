import React, { useContext, useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { SidebarContext } from '../context/SidebarContext'
import Header from '../components/Header'
import { UserAuth } from '../context/AuthContext'
import PageTitle from '../components/Typography/PageTitle'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Pie } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'

import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
} from '@windmill/react-ui'
import { EyeIcon } from '../icons'
import Badge from '../components/Badge'
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

const Home = () => {

    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
    let location = useLocation()

    useEffect(() => {
        closeSidebar()
        // eslint-disable-next-line
    }, [location])

    const { ticketsAssigned } = UserAuth();

    const [data, setData] = useState([]);


    useEffect(() => {
        if (ticketsAssigned === undefined) {
        } else {
            setData(ticketsAssigned)
        }
        // eslint-disable-next-line
    }, [ticketsAssigned])


    const { pCount, sCount } = UserAuth()
    const status = sCount()
    const priority = pCount()

    const doughnutOptions = {
        data: {
            datasets: [
                {
                    data: [priority[0], priority[1], priority[2]],
                    backgroundColor: ['#8ab339', '#fbaf00', '#810101'],
                    label: 'Dataset 1',
                },
            ],
            labels: ['Low', 'Medium', 'High'],
        },
        options: {
            responsive: true,
            cutoutPercentage: 50,
        },
        legend: {
            display: false,
        }
    }

    const doughnutLegends = [
        { title: 'Low', color: 'bg-yellow-400' },
        { title: 'Medium', color: 'bg-green-500' },
        { title: 'High', color: 'bg-red-500' }
    ]

    const pieLegends = [
        { title: 'To Do', color: 'bg-blue-500' },
        { title: 'In Progress', color: 'bg-purple-600' },
        { title: 'Done', color: 'bg-green-500' },
    ]

    const pieData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                label: 'Dataset 2',
                backgroundColor: ['#3F83F8', '#6C2BD9', '#8ab339'],
                data: [status[0], status[1], status[2]]
            }
        ],
        options: {
            responsive: true,
        },
        legend: {
            display: false,
        }
    }

    return (
        <div className={`flex h-full min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
            <Sidebar active="dashboard" />
            <div className="flex flex-col flex-1 w-full">
                <Header />

                <div className="pl-6 pr-6  dark:bg-gray-900 bg-gray-50 pb-6">
                    <div className="flex justify-between items-center">
                        <PageTitle>Tickets</PageTitle>
                    </div>
                    {/* <SectionTitle>Table with actions</SectionTitle> */}
                    <TableContainer className="mb-8">
                        <Table>
                            <TableHeader className="dark:text-gray-200">
                                <tr>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Assigned To</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Modifed Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {data.map((ticket, i) => (
                                    <TableRow key={i} className="hover:bg-gray-100 dark:hover:bg-gray-700">

                                        <TableCell>
                                            <div>
                                                <Link to={`/viewticket/${ticket.id}`} >
                                                    <p className="text-base text-gray-600 dark:text-gray-200 capitalize">{ticket.title}</p>
                                                </Link>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <p className="text-base text-gray-600 dark:text-gray-200">{ticket.assignedTo}</p>
                                        </TableCell>

                                        <TableCell>
                                            <p className="text-sm text-gray-600 dark:text-gray-200">{ticket.type}</p>
                                        </TableCell>

                                        <TableCell>
                                            <Badge type={ticket.priority}></Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge type={ticket.status}></Badge>
                                        </TableCell>

                                        <TableCell>
                                            <p className="text-sm text-gray-600 dark:text-gray-200">
                                                {
                                                    ticket.modifiedDate === undefined ?
                                                        formatDate(new Date(ticket.createdDate.seconds * 1000))
                                                        :
                                                        formatDate(new Date(ticket.modifiedDate.seconds * 1000))
                                                }
                                            </p>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center justify-center space-x-4">
                                                <Link to={`/editticket/${ticket.id}`} >
                                                    <button size="icon" title='View' className="text-purple-600" aria-label="View" >
                                                        <EyeIcon className="w-5 h-5 " aria-hidden="true" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className="pl-6 pr-6  dark:bg-gray-900 bg-gray-50 pb-6">
                    <PageTitle>Charts</PageTitle>
                    <div className="grid gap-6 mb-8 md:grid-cols-2">

                        <ChartCard title="Ticket's Status">
                            <Pie
                                data={pieData}
                                options={{
                                    legend: {
                                        display: false,
                                    }
                                }}
                            />
                            <ChartLegend legends={pieLegends} />
                        </ChartCard>

                        <ChartCard title="Ticket's Priority">
                            <Doughnut {...doughnutOptions} />
                            <ChartLegend legends={doughnutLegends} />
                        </ChartCard>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Home