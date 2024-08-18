import React from 'react'
import '../css/Home.css'
import {Navbar} from '../components/Navbar';
import {Products} from '../components/Products';

export const Home = () => {
    return(
        <div className='wrapper'>
            <Navbar/>
            <Products/>
        </div>
    )
}
export default Home