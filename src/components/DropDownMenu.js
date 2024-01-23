import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropDown() {
  return (
    <Dropdown className='ml-10'>
      <Dropdown.Toggle id="dropdown-basic" className='bg-color-white bg-transparent text-black border-black border-2'>
        Categories
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="categories/1">Clothing</Dropdown.Item>
        <Dropdown.Item href="categories/2">Kitchen</Dropdown.Item>
        <Dropdown.Item href="categories/3">Electronics</Dropdown.Item>
        <Dropdown.Item href="categories/4">Books</Dropdown.Item>
        <Dropdown.Item href="categories/5">Home Appliances</Dropdown.Item>
        <Dropdown.Item href="categories/6">Automobiles</Dropdown.Item>  
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;