import React from 'react';
import { Form } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';

function Search() {
    const [text, setText] = React.useState('')
    const [res, setRes] = React.useState<any[]>([])
    const [status, setStatus] = React.useState('')
    const [fail, setFail] = React.useState(false)

    const fetchData = async () => {
        let data = { text }

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
                setFail(false)
                const arr = await response.json()
                setRes(arr.map((item: any) => {
                    const textArr = item.split(' ')
                    let len = textArr.length
                    let disease = textArr[4]
                    for (let i = 5; i < len-2; i++) {
                        disease += ' ' + textArr[i]
                    }
                    return {
                        date: textArr[0] +" "+ textArr[1] +" "+ textArr[2],
                        name: textArr[3],
                        disease: disease,
                        similarity: textArr[len-2],
                        verdict: textArr[len-1]
                    }
                }))
            } else{
                setStatus(await response.text())
                setRes([])
                setFail(true)
            }
        } catch (error) {
            setStatus('Internal Server error')
            setRes([])
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
                    {fail && <p className='text-warning'>{status}</p>}
                </Form>
            </div>

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