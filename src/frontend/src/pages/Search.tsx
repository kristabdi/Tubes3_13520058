import React from 'react';
import { Form } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';

function Search() {
    const [text, setText] = React.useState('')
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {   
        e.preventDefault();
        console.log('submit');
        console.log("text: " + text);
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('submit');
            console.log("text: " + text);
        }
    }

    return (
        <div className='container'>
            <Form className='search'>
                <h1 className='text-white my-4'>Search</h1>
                <div className='search-bar'>
                    <input
                        className='input-search'
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder='13 April 2022 HIV'
                        onKeyDown= {handleEnter}/>
                    <button className='input-submit' onClick={handleClick}><BiSearch /></button>
                </div>
            </Form>
        </div>
    )
}

export default Search