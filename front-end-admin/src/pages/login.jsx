import { useState, useEffect } from 'react';
import { jwt } from 'jsonwebtoken'

const token = localStorage.getItem("token")
const user = token ? jwt.decode(token) : null

function App(server) {

    return (
        <div>
            <div>Hello we're now in React</div>
        </div>
    )

}

export default App