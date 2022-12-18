import React, { useEffect, useState } from "react";
import axios from 'axios'
import Compare from "../Components/Compare";

function App() {

  const [data, setData] = useState([])
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('');
  const [imageEdit, setEditImagem] = useState('')
  const [endImg] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbdkoTPWqITpkZO52UGy0-Lvsr0u4m6EUfg&usqp=CAU')
  const [status, setStatus] = useState({
    type: '',
    active: false
  })

  const getImagens = async () => {
    try {
      const res = await axios.get("http://localhost:8080")
      setData(res.data.imagens)
      setUrl(res.data.url)
    } catch (erro) {
      console.log(erro)
    }
  }

  const uploadImage = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    if (imageEdit) {
      await axios.put(`http://localhost:8080/${imageEdit.id}`, formData)
        .then((respons) => {
          setData(data.map((item, index) => imageEdit.id === index ? respons.data : item))
        })
        .catch((respons) => console.log(respons))
    } else {
      await axios.post("http://localhost:8080", formData)
        .then((response) => {
          console.log(response)
          setStatus({
            type: 'sucess',
            active: false
          })
        }).catch((err) => {
          console.log(err)
          setStatus({
            type: 'error',
            active: false
          })
        });
    }
  }

  const HandleRemove = idimages => {
    axios.delete(`http://localhost:8080/${idimages}`)
      .then(() => {
        setData(data.filter((item) => item.id !== idimages))
      })
  }

  useEffect(() => {
    getImagens()
  }, [])

  return (
    <div>
      <h1>Upload</h1>
      {status.type === 'sucess' ? <p>{status.type}</p> : <p>{status.type}</p>}

      <form onSubmit={uploadImage} encType="multipart/form-data" >
        <label>Imagem: </label>
        <input type="file" name="image" onChange={e => setImage(e.target.files[0])} />

        <button type="submit">Salvar</button>
      </form>
      {image ? <img src={URL.createObjectURL(image)} alt="imagem" width="150" height="150" /> : <img src={endImg} alt="Imagem padrão" />}

      {data.map(item => (
        <div key={item.id}>
          <span>{item.id}</span>
          <img src={url + item.image} width="150" height="150" alt="erro ao encontrar a image" />
          <button onClick={() => HandleRemove(item.id)}>DELETAR</button>
          <button onClick={() => setEditImagem({ ...item })}>EDITAR</button>
          <hr />
        </div>
      ))}

      <Compare/>
    </div>

  );
}

export default App;
