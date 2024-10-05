
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Settings from './components/Settings';
import Change from './components/Change';
import Shop from './components/Shop';
// import Test from './components/Test';


function App() {
    return (
        <Routes>
            <Route index element={<Index />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/change' element={<Change />} />
            <Route path='/shop' element={<Shop />} />
            {/* <Route path="/test" element={<Test />} /> */}
        </Routes >
    );
}

export default App;
