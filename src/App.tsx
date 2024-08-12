import React, { useEffect } from 'react'
import Navbar from './section/Navbar'
import Wrapper from './section/Wrapper'
import Footer from './section/Footer'
import Background from './components/Background'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import "./scss/index.scss";
import Search from './pages/Search'
import MyList from './pages/MyList'
import About from './pages/About'
import Compare from './pages/Compare'
import Pokemon from './pages/Pokemon'
import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './app/hooks'
import { clearToasts, setUserStatus } from './app/slices/AppSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseauth } from './utils/FireBaseConfig'

function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  //the useEffect condition tells us that of the payload has been entered some data it will call the taost function and clear it afterwards.
  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      }
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);

  useEffect(() => {
    onAuthStateChanged(firebaseauth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserStatus({ email: currentUser.email }))
      }
    })

  }, [dispatch]);




  return (
    <div className='main-container'>
      <Background />
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route element={<Search />} path='/search' />
            <Route element={<MyList />} path='/list' />
            <Route element={<About />} path='/about' />
            <Route element={<Compare />} path='/compare' />
            <Route element={<Pokemon />} path="/pokemon/:id" />
            <Route element={<Navigate to="/pokemon/1" />} path="*" />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App