import React,{ useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import  authService from './appwrite/auth'
import { login, logout } from './store/authSlice';
import { Header,Footer } from './components/index.js';
import { Outlet } from "react-router-dom";

function App() {
  
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try{
        const userData = await authService.getCurrentUser();
        if(userData && typeof userData === 'object'){
          dispatch(login(userData));
        }
        else{
          dispatch(logout());
        }
      }
      catch(error){
        console.error('Error fetching user:', error);
        dispatch(logout());
      } finally{
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, [dispatch]);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
            <main>
               TODO : <Outlet/>
            </main>
        <Footer/>
        </div>
        </div>
  ) : null
}

export default App
