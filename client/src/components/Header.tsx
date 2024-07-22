import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as ScrollLink } from 'react-scroll';
import Image from 'next/image';
import logo from '../../public/nested-logo.png';

const Header = () => {
  return (
    <AppBar position="fixed" className="shadow-sm min-w-full">
      <Toolbar className="container mx-auto flex justify-between items-center m-0 w-full max-w-none">
        <Image src={logo} alt="Logo" width={75} height={75} />
        <div className="flex justify-evenly flex-grow">
          <ScrollLink to="welcome" smooth={true} duration={500} className="cursor-pointer">
            <Button className="text-gray-500 hover:text-green-600 focus:text-green-600 active:text-green-600">Welcome to Nested</Button>
          </ScrollLink>
          <ScrollLink to="how-it-works" smooth={true} duration={500} className="cursor-pointer">
            <Button className="text-gray-500 hover:text-green-600 focus:text-green-600 active:text-green-600">How It Works</Button>
          </ScrollLink>
          <ScrollLink to="about-us" smooth={true} duration={500} className="cursor-pointer">
            <Button className="text-gray-500 hover:text-green-600 focus:text-green-600 active:text-green-600">About Us</Button>
          </ScrollLink>
          <ScrollLink to="our-success" smooth={true} duration={500} className="cursor-pointer">
            <Button className="text-gray-500 hover:text-green-600 focus:text-green-600 active:text-green-600">Our Success</Button>
          </ScrollLink>
        </div>
        <ScrollLink to="try-it-out" smooth={true} duration={500} className="cursor-pointer">
          <Button variant="contained" className="bg-green-600 text-white hover:bg-green-700 focus:bg-green-700 active:bg-green-800">Try It Out!</Button>
        </ScrollLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
