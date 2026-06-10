import Login from './routes/Login';
import Principal from './routes/Principal';
import NotFound from './routes/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import {Routes,Route} from 'react-router-dom';


function App(){
    return(
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/principal" element={<ProtectedRoute><Principal /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    )
}

export default App;
