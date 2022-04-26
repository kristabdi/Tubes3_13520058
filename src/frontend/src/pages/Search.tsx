import React from 'react';
import { Form } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';

function Search() {
    const [text, setText] = React.useState('')
    const [res, setRes] = React.useState<any[]>([])
    const [status, setStatus] = React.useState('')
    const [fail, setFail] = React.useState(false)

    const validInput = /^\s*\d{2}\s+\w+\s+\d{4}\s+\w+\s*$/g
    const validDisease = /^\s*\w+\s*$/g

    const fetchData = async () => {
        let data = {
            date : "",
            name : ""
        }
        let arr = text.split(/(\s+)/).filter(function(e){return e.trim().length > 0})
        if (validInput.test(text)) {
            data.date = arr[0] + " " + arr[1] + " " + arr[2]
            data.name = arr[3]
            setFail(false)
        } else if (validDisease.test(text)) {
            data.name = arr[0]
            setFail(false)
        } else if (arr.length===4){
            let date = arr[0] + " " + arr[1] + " " + arr[2]
            let name = arr[3]
            if (validInput.test(text) && validDisease.test(name)) {
                data.date = date
                data.name = name
                setFail(false)
            }
        } else {
            setFail(true)
        }

        if(!fail){
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
                            date: textArr[0] +" "+ textArr[1] +" "+ textArr[2],
                            name: textArr[3],
                            disease: textArr[4],
                            similarity: textArr[5],
                            verdict: textArr[6]
                        }
                    }))
                } else{
                    setStatus(await response.text())
                    setRes([])
                }
            } catch (error) {
                setStatus('Internal Server error')
                setRes([])
            }
        }
    }
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {   
        e.preventDefault();
        fetchData();
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
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
                    {fail && <p className='text-warning'>Invalid input</p>}
                </Form>
            </div>

            {/* Blum ngehandle kalo resnya kosong */}
            <div className='container mt-5'>
            {res.length===0 && status!=='OK' ? 
                !fail && <p className='text-white'>{status}</p> 
                :
                <div className='result'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>Date</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Disease</th>
                                <th scope='col'>Similarity</th>
                                <th scope='col'>Verdict</th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.name}</td>
                                    <td>{item.disease}</td>
                                    <td>{item.similarity}</td>
                                    <td>{item.verdict}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            </div>
        </>
    )
}

export default Search