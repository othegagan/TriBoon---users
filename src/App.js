import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/Login';
import Page404 from './pages/404'
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import RedirectRoute from './components/RedirectRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import Modal from './pages/Modals'
import Scheduler from './pages/Scheduler'
import Buttons from './pages/Buttons';
import Test from './pages/test';
import Cards from './pages/Cards';
import Messages from './pages/Messages';
import Tickets from './pages/Tickets';
import ViewTicket from './pages/ViewTicket';
import EditTicket from './pages/EditTicket';

const App = () => {
    return (
        <>
            <AuthContextProvider>
                <Router>
                    <Routes>
                        {/* Basic pages */}
                        <Route element={<RedirectRoute />}>
                            <Route path="/" element={<SignIn />} />
                            <Route path='/signin' element={<SignIn />} />
                        </Route>

                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path='/home' element={<Home />} />
                            <Route path='/scheduler' element={<Scheduler />} />
                            <Route path='/messages' element={<Messages title="Messages"/>} />
                            <Route path='/tickets' element={<Tickets title="Tickets"/>} />
                            <Route path='/viewticket/:id'  element={<ViewTicket  title="Ticket Details"/>} />
                            <Route path='/editticket/:id'  element={<EditTicket  title="Edit Ticket Details"/>} />
                        </Route>


                        {/* Extra pages */}
                        <Route path="/modal" element={<Modal />} />
                        <Route path="/buttons" element={<Buttons />} />
                        <Route path="/cards" element={<Cards />} />
                        <Route path="/test" element={<Test />} />

                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </Router>
            </AuthContextProvider>
        </>
    )
}

export default App
