import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinTheCables from './GAMES/JoinTheCables';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={'Error 404'} />

                <Route path='/' element={<JoinTheCables />} />
            </Routes>
        </BrowserRouter>
    );
}
