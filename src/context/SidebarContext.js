import React, { useState, useMemo } from 'react'

// create context
export const SidebarContext = React.createContext()

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    function toggleSidebar() {
        // eslint-disable-next-line
        setIsSidebarOpen(!isSidebarOpen)
    }

    function closeSidebar() {
        setIsSidebarOpen(false)
    }

    const value = useMemo(
        () => ({
            isSidebarOpen,
            toggleSidebar,
            closeSidebar,
        }),
        // eslint-disable-next-line
        [isSidebarOpen]
    )

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}