import {useState} from 'react'

import './App.css'
import Header from './containers/Header/Header.tsx'
import SignUP from "./Auth/Registration/SignUP.tsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Header/>
        </>
    )
}

export default App
