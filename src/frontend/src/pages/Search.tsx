import axios from 'axios';
import React from 'react';
import { Form } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';

function Search() {
    var result : any[] = [
        {
            date : "2020-04-01",
            name : "Budi",
            disease : "Penyakit 1",
            verdict : true,
            similarity : 0.9
        }
    ]
    
    const [text, setText] = React.useState('')
    const [res, setRes] = React.useState<any[]>(result)


    const fetchData = () => {
        const newData = {
            text: text
        }
        axios.post('api/history', {
            header : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body : newData
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setRes(res.data)
            })
            .catch(err => { console.log(err); });
    }
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {   
        e.preventDefault();
        console.log('submit');
        console.log("text: " + text);

        fetchData();
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('submit');
            console.log("text: " + text);

            fetchData();
        }
    }

    return (
        <>
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

            {/* Blum ngehandle kalo resnya kosong */}
            <div className='container mt-5'>
                <div className='result'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>Date</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Disease</th>
                                <th scope='col'>Verdict</th>
                                <th scope='col'>Similarity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.name}</td>
                                    <td>{item.disease}</td>
                                    <td>{item.verdict ? 'True' : 'False'}</td>
                                    <td>{item.similarity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Search