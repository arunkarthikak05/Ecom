import { MdShoppingCart } from "react-icons/md";
import { Link , useNavigate} from "react-router-dom";
import LogoImage from "../images/myntra-logo.png"
import '../index.css'
import Searchbar from "./Searchbar";

export default function Navbar(){
    const location = window.location.href
    function isActive(path) {  
        return location.includes(path) ? 'active' : '';
    }
    const navigate = useNavigate()
    const handleImageClick = () => {
        navigate('/')
    }
    return (
        <div className="after-effect flex flex-row p-3 items-center max-w-full mb-3">
            <img className="cursor-pointer" src={LogoImage} alt="logo" width="3%" height="100%"onClick={()=>handleImageClick()}/>
            <nav className="mt-3">   
            <ul className="text-sm text-gray-500">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-5 items-center">
                    <div><li><Link to='/categories/1' className={isActive('/categories/1')}>CLOTHING</Link></li></div> 
                    <div><li><Link to='/categories/2' className={isActive('/categories/2')}>KITCHEN</Link></li></div> 
                    <div><li><Link to='/categories/3' className={isActive('/categories/3')}>ELECTRONICS</Link></li></div> 
                    <div><li><Link to='/categories/4' className={isActive('/categories/4')}>BOOKS</Link></li></div> 
                    <div><li><Link to='/categories/5' className={isActive('/categories/5')}>HOME APPLIANCES</Link></li></div> 
                    <div><li><Link to='/categories/6' className={isActive('/categories/6')}>AUTOMOBILES</Link></li></div>           
                    </div>
                    <Searchbar/>
                    <div className="right-10 absolute"><li><Link to='/allProducts'><MdShoppingCart className="text-2xl"/></Link></li></div>
                </div>
            </ul>
            </nav>
        </div>
    );
}