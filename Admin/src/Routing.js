import {Route, Routes} from 'react-router-dom'
import AddCategory from './Pages/AddCategory';
import AddPro from './Pages/AddPro';
import Addusers from './Pages/Addusers';
import Categories from './Pages/Categories';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login'
import Password from './Pages/Password';
import Products from './Pages/Products';
import Users from './Pages/Users';

function Routing(){
    return (
        <>
            <Routes>
                <Route path = "/" element={<Login/>}/>
                <Route path = "/dashboard" element={<Dashboard/>}/>
                <Route path = "/users" element={<Users/>}/>
                <Route path = "/addusers" element={<Addusers/>}/>
                <Route path = "/password" element={<Password/>}/>
                <Route path = "/add-cat" element = {<AddCategory/>}/>
                <Route path = "/add-pro" element = {<AddPro/>}/>
                <Route path = "/categories" element = {<Categories/>}/>
                <Route path = "/products" element = {<Products/>}/>
            </Routes>
        </>
    )
}
export default Routing;