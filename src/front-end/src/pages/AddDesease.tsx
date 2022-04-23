import React from 'react';

function AddDesease() {
    const [desease, setDesease] = React.useState("");
    const [sequence, setSequence] = React.useState("");

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

    const handleSubmitDisease = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('submit');
        console.log("desease: " + desease);
        console.log("sequence: " + sequence);
    }

  return (
    <div>
        <h1>Tambah Penyakit</h1>
        <div>
            <form>
                <input type="text" placeholder="Nama Penyakit" onChange={(e => setDesease(e.target.value)) } />
                <input type="file" onChange={handleChangeFile} />
                <button type="submit" onClick={handleSubmitDisease}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddDesease