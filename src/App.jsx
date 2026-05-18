import { useState } from 'react';
import Login from './routes/Login';
import Principal from './routes/Principal';

function App(){
    const [isLogged, setLogged] = useState(false);
    
    return(
        isLogged ? <Principal /> : <Login onLogin={() => setLogged(true)} />
    )
}

export default App;
