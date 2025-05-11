import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 導覽列 */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors">
            <img src="/src/assets/img/ev-logo.png" alt="EV Logo" className="h-12 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold">基隆友善車行一點通</span>
              <span className="text-base font-semibold text-gray-600 tracking-wide">KEELUNG EV FRIENDLY SHOP</span>
            </div>
          </Link>
        
          <nav className="hidden lg:block">
            <ul className="flex gap-10 text-lg">
              <li>
                <Link to="/map" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                  友善車行地圖
                </Link>
              </li>
              <li className="relative group">
                <Link to="/subsidy-intro" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                  申請補助專區
                </Link>
                <ul className="absolute hidden group-hover:block top-full left-0 bg-white py-2 min-w-40 border border-gray-200 shadow-lg z-50">
                  <li>
                    <Link to="/subsidy-intro" className="block px-5 py-2 text-gray-800 hover:bg-gray-100">
                      產業轉型補助
                    </Link>
                  </li>
                  <li>
                    <Link to="/teen-subsidy-intro" className="block px-5 py-2 text-gray-800 hover:bg-gray-100">
                      公益青年代辦
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://www.keelungyouth.com/%E5%9C%93%E5%A4%A2%E8%B2%B8%E6%AC%BE" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-5 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      中小企業貸款
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.keelungyouth.com/%E8%B2%B8%E6%AC%BE%E5%88%A9%E6%81%AF%E8%A3%9C%E8%B2%BC" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-5 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      青創貸款補貼
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/rules" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                  申請補助規則
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                  活動快訊
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                  政策成效
                </Link>
              </li>
            </ul>
          </nav>

          {/* 漢堡圖示 */}
          <img 
            src="/src/assets/img/list.png" 
            className="w-8 h-8 cursor-pointer lg:hidden" 
            id="menuIcon" 
            alt="menu" 
            onClick={toggleMenu}
          />
        </div>
      </header>

      {/* 側邊滑出選單 */}
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg pt-24 px-6 z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-6">
          <li>
            <Link 
              to="/map" 
              onClick={closeMenu}
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              友善車行地圖
            </Link>
          </li>
          <li>
            <Link 
              to="/subsidy-intro" 
              onClick={closeMenu}
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              申請補助專區
            </Link>
          </li>
          <li>
            <Link 
              to="/rules" 
              onClick={closeMenu}
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              申請補助規則
            </Link>
          </li>
          <li>
            <Link 
              to="/news" 
              onClick={closeMenu}
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              活動快訊
            </Link>
          </li>
          <li>
            <Link 
              to="/results" 
              onClick={closeMenu}
              className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
            >
              政策成效
            </Link>
          </li>
        </ul>
      </div>

      {/* 遮罩層 */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />
    </>
  );
}

export default Navbar;