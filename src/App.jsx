import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Description from './pages/Description';
import SubsidyIntro from './pages/SubsidyIntro';
import SubsidyForm from './pages/SubsidyForm';
import SubsidySupplement from './pages/SubsidySupplement';
import TeenSubsidy from './pages/TeenSubsidy';
import TeenSubsidyIntro from './pages/TeenSubsidyIntro';
import TeenSubsidySupplement from './pages/TeenSubsidySupplement';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/description" element={<Description />} />
            <Route path="/subsidy-intro" element={<SubsidyIntro />} />
            <Route path="/subsidy-form" element={<SubsidyForm />} />
            <Route path="/subsidy-supplement" element={<SubsidySupplement />} />
            <Route path="/teen-subsidy" element={<TeenSubsidy />} />
            <Route path="/teen-subsidy-intro" element={<TeenSubsidyIntro />} />
            <Route path="/teen-subsidy-supplement" element={<TeenSubsidySupplement />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
