import React from 'react'

const NumResults = ({ query }) => {
    return (
        <div>
            <p className="num-results">
                Found <strong>{query}</strong> results
            </p>
        </div>
    )
}

export default NumResults
