import React from 'react';
import { Button, Form } from 'react-bootstrap';

function AddDesease() {
    const [desease, setDesease] = React.useState("");
    const [sequence, setSequence] = React.useState("");
    const [status, setStatus] = React.useState('')

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

    const handleSubmitDisease = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('submit');
        console.log("desease: " + desease);
        console.log("sequence: " + sequence);

        // Make post request to server
        try {
            const response = await fetch('/api/insert/', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: desease,
                    sequence: sequence
                })
            })
            setStatus(await response.text())
        } catch (error) {
            setStatus('Internal Server error')
        }
    }

  return (
    <div className = 'container mt-5'>
        <div className='card'>
            <h1>Add Desease</h1>
            <p>Status: {status}</p>
            <Form className='form'>
                <p className='mt-2'>Disease</p>
                <input type="text" placeholder="Name" onChange={(e => setDesease(e.target.value)) } />
                <p>Sequence</p>
                <input type="file" onChange={handleChangeFile} />
                <Button variant="primary" onClick={handleSubmitDisease} className='button mt-2'>Submit</Button>
            </Form>
        </div>
    </div>
  )
}

export default AddDesease