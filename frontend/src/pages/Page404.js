import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <>
            <div>Page404</div>
            <h2>Sayfa bulunamadi</h2>
            <Link to='/'>
                <h1>Ana sayfaya geri don</h1>
            </Link>
        </>
    )
}

export default Page404