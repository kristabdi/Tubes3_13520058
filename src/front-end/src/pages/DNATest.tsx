import axios from 'axios'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

function DNATest() {
    const [name, setName] = React.useState('')
    const [sequence, setSequence] = React.useState('')
    const [disease, setDisease] = React.useState('')
    const [result, setResult] = React.useState('')

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                setSequence(reader.result as string);
            }
        }
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('submit');
        console.log("name: " + name);
        console.log("sequence: " + sequence);
        console.log("disease: " + disease);

        // Make post request to server
        const newDNATest = {
            name: name,
            sequence: sequence,
            disease: disease
        }

        axios.post('http://127.0.0.1:3000/api/match', {
            header : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: newDNATest
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setResult(res.data.result)
            })
            .catch(err => { console.log(err); });
    }

  return (
    <div className = 'container mt-5'>
        <div className='card'>
            <h1>DNA Test</h1>
            <Form className='form'>
                <p className='mt-2'>Username</p>
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                <p>Sequence</p>
                <input type="file" onChange={handleChangeFile}/>
                <p>Disease</p>
                <input type="text" placeholder='Disease' onChange={e => setDisease(e.target.value)}/>
                <Button variant="primary" onClick={handleSubmit} className='button mt-2'>Submit</Button>
            </Form>
        </div>
    </div>
  )
}

export default DNATest