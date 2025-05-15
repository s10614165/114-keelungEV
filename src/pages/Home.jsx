import { Link } from 'react-router-dom';
import backgroundImg from '@/assets/img/background.png';
import applyEnterImg from '@/assets/img/apply-enter.png';
import mapEnterImg from '@/assets/img/map-enter.png';

function Home() {
  return (
    <div 
      className="flex-1 h-screen flex justify-center items-center  bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="flex gap-8 flex-wrap justify-center items-center max-w-full">
        <div className="transform -translate-y-6">
          <Link to="/subsidy-intro" className="block">
            <img 
              src={applyEnterImg} 
              alt="補助申請專區" 
              className="w-[300px] max-w-full h-auto transition-transform duration-300 hover:scale-105" 
            />
          </Link>
        </div>
        <div>
          <Link to="/map" className="block">
            <img 
              src={mapEnterImg} 
              alt="友善車行地圖" 
              className="w-[300px] max-w-full h-auto transition-transform duration-300 hover:scale-105" 
            />
          </Link>
        </div>
      </div>
    </div>
  );
}


export default Home;