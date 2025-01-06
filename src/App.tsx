import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './MAIN/Home/Home';


export default function App() {

    const query = new QueryClient()

    return (
        <QueryClientProvider client={query}>
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={'Error 404'} />

                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}
