import React from 'react'
import ReactDOM from 'react-dom/client'
import {  HelmetProvider } from 'react-helmet-async';

import { RouterProvider } from 'react-router-dom';
import './index.css'



import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { router } from './routes/Routes';
import { AuthProvider } from './Provider/AuthProvider';



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <div className=''>
             
              <RouterProvider router={router}></RouterProvider>
            </div>
          </HelmetProvider>
        </QueryClientProvider>
      </AuthProvider>
   
  </React.StrictMode>,
)
