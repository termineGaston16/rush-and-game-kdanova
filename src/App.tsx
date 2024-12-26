import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinTheCables from './GAMES/JOINTHECABLES/JoinTheCables';
import RotateTheTriangle from './GAMES/ROTATETHETRIANGULE/RotateTheTriangle';
import CopyTheCode from './GAMES/COPYTHECODE/CopyTheCode';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={'Error 404'} />
        
                <Route path='/JoinTheCables' element={<JoinTheCables />} />
                <Route path='/RotateTheTriangle' element={<RotateTheTriangle />} />
                <Route path='/' element={<CopyTheCode />} />
            </Routes>
        </BrowserRouter>
    );
}
