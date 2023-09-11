import React from 'react'

export default function MissingPage() {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                fontFamily: "'Oxygen', sans-serif",
                fontSize: '2em',
            }}>
            <div style={{margin: "auto", width: 'fit-content', translateY: '50%', top: '50%', position: 'relative'}}>
                <span style={{color: '#00AD0B', fontWeight: 'bold'}}>404 | </span> Page Not Found
            </div>
        </div>
    )
}