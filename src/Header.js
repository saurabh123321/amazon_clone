import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{basket, user}, dispatch] = useStateValue(); 

    const handleAuthentication = () => {
        if(user){
            auth.signOut(); 
        }
    }

  return (
    <div className='header'>
        {/* go back to home when click on amazon image in header */}
        <Link to="/">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ82Io_97oYZWyD8sw7QWy9V7X1ucalRIJCwm_VDLyJiJCb7FLicu9LI8qL_y8DZma2Teg&usqp=CAU' 
            className='header_logo'/>
        </Link>
         

         <div className='header_search'>
             <input className='header_searchInput' type="text">            
            </input>            
            <SearchIcon className='header_searchIcon'></SearchIcon>

        </div>

        <div className='header_nav'>
            <Link to={!user && "/login"}>
            <div className='header_option' onClick={handleAuthentication}>
                <span className='header_optionLineone'>
                    Hello, {!user? 'Guest' : user.email}
                </span>
               
                    <span className='header_optionLineTwo'>
                        {user? 'Sign Out' : 'Sign In'}
                    </span>
                
                
            </div>
            </Link>
            <div className='header_option'>
                <span className='header_optionLineone'>
                Returns
                </span>
                <span className='header_optionLineTwo'>
                    Order
                </span>
            </div>
            <div className='header_option'>
            <span className='header_optionLineone'>Your
                </span>
                <span className='header_optionLineTwo'>Prime</span>
            </div>
            

        </div>
        {/* when click on the basket icon go to the checkout page */}
        <Link to="/checkout">
            <div className='header_optionBasket'>
                <ShoppingBasketIcon ></ShoppingBasketIcon>
                <span className='header_optionLineTwo header_basketCount'>
                    {basket?.length}
                </span>
            </div>
        
        </Link>

        

        
    </div>
  )
}

 export default Header