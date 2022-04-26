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
    const [status, setStatus] = React.useState('')


    const fetchData = async () => {
        let valid = true
        let data = {
            name: "penyakittest",
            date: ""
        }
        let space = text.split(" ")
        if (space.length===1){
            // let match = Array.from(text.matchAll(/[a-zA-Z]+/g))
            // if(match[0].length !== text.length){
            //     valid=false
            // }
            // data.name = match[0].input
        } else if(space.length===3){
            // valid=false

        } else if(space.length===4){
            // valid=false
        }else{
            valid=false
        }

        if(valid===false){
            setStatus('Invalid input')
        } else{
            try {
                const response = await fetch('/api/history/', {
                    method: 'POST',
                    mode: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                if(response.ok){
                    setStatus("OK")
                    const arr = await response.json()
                    setRes(arr.map((item: any) => {
                        const textArr = item.split(' ')
                        return {
                            date: textArr[0] + textArr[1] + textArr[2],
                            name: textArr[3],
                            disease: textArr[4],
                            verdict: textArr[6],
                            similarity: textArr[5]
                        }
                    }))
                } else{
                    setStatus(await response.text())
                }
            } catch (error) {
                setStatus('Internal Server error')
            }
        }
        
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
                <p>Status: {status}</p>
                <Form className='search'>
                    <h1 className='text-white my-4'>Search</h1>
                    <p className='text-white'>Status: {status}</p>
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