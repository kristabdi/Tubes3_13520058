import React from 'react';

function Search() {
    const [text, setText] = React.useState('')
    
    const handleClick = () => {
        console.log(text)
    }

    return (
        <div>
            <h1>Search</h1>
            <input type="text" value={text} onChange={e => setText(e.target.value)}/>
            <button onClick={handleClick}>Search</button>
        </div>
    )
}

export default Search