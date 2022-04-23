import React from 'react'

function DNATest() {
    const [name, setName] = React.useState('')
    const [sequence, setSequence] = React.useState('')
    const [disease, setDisease] = React.useState('')

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
        console.log("name: " + name);
        console.log("sequence: " + sequence);
        console.log("disease: " + disease);
    }

  return (
    <div>
        <h1>DNA Test</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
            <input type="file" onChange={handleChangeFile}/>
            <input type="text" placeholder='Disease' onChange={e => setDisease(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default DNATest