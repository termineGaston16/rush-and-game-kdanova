import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './MAIN/Home/Home';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={'Error 404'} />

                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
