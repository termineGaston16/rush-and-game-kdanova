import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinTheCables from './GAMES/JOINTHECABLES/JoinTheCables';
import RotateTheTriangle from './GAMES/ROTATETHETRIANGULE/RotateTheTriangle';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={'Error 404'} />
        
                <Route path='/JoinTheCables' element={<JoinTheCables />} />
                <Route path='/' element={<RotateTheTriangle />} />
            </Routes>
        </BrowserRouter>
    );
}
