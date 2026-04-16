import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-[#2d524a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
   
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight">KeenKeeper</h2>
        
    
        <p className="text-emerald-100/70 text-center max-w-2xl text-sm md:text-base mb-10 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="flex flex-col items-center gap-6 mb-12">
          <h3 className="text-xl font-medium">Social Links</h3>
          <div className="flex gap-4">
            <a href="#" className="bg-white p-2.5 rounded-full text-[#2d524a] hover:bg-emerald-100 transition-all shadow-md">

               <FaInstagram/>

            </a>
            <a href="#" className="bg-white p-2.5 rounded-full text-[#2d524a] hover:bg-emerald-100 transition-all shadow-md">
             
              <FaFacebook/>

            </a>
            <a href="#" className="bg-white p-2.5 rounded-full text-[#2d524a] hover:bg-emerald-100 transition-all shadow-md">
              
              <FaTwitter/>

            </a>
          </div>
        </div>
        <div className="w-full border-t border-emerald-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-100/50 gap-4">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
        


<p className="max-w-xl text-emerald-200 text-sm md:text-base leading-relaxed ">
            Designed and Developed by <span className="text-white font-bold">Moheuddin Al Usama</span>
           
          </p>



          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
        
      </div>
    </footer>
    );
};

export default Footer;