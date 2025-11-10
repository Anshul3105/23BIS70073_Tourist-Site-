import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home  from './pages/Home';
import Explorer from "./pages/Explore";
import DestinationDetail from './pages/DestinationDetail';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explorer />} />
         <Route path="/place/:id" element={<DestinationDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
