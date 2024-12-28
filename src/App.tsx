import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinTheCables from './GAMES/JOINTHECABLES/JoinTheCables';
import RotateTheTriangle from './GAMES/ROTATETHETRIANGULE/RotateTheTriangle';
import CopyTheCode from './GAMES/COPYTHECODE/CopyTheCode';
import MemoryGame from './GAMES/MEMORYGAME/MemoryGame';
import QuickTimeEvent from './GAMES/QUICKTIMEEVENT/QuickTimeEvent';
import CatchIko from './GAMES/CATCHIKO/CatchIko';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={'Error 404'} />
        
                <Route path='/JoinTheCables' element={<JoinTheCables />} />
                <Route path='/RotateTheTriangle' element={<RotateTheTriangle />} />
                <Route path='/CopyTheCode' element={<CopyTheCode />} />
                <Route path='/MemoryGame' element={<MemoryGame />} />
                <Route path='/QuickTimeEvent' element={<QuickTimeEvent />} />
                <Route path='/' element={<CatchIko />} />
            </Routes>
        </BrowserRouter>
    );
}
