import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from "axios";

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nome, setNome] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")

    const headers = {
        headers: {
          Authorization: "allan-rafael-conway"
        }
      };

      const newTrack = {
        name: nome,
        artist: artista,
        url: url
      }
      const recebeMusicas = (id) => {
        axios
          .get(
            `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`,
            headers
          )
          .then((resposta) => {
            setMusicas(resposta.data.result.tracks);
          })
          .catch((erro) => {
            // alert("deu ruim");
            // alert(erro.response.data);
            console.log(erro.response);
          });
      };
      const addTracks = (id) => {
        axios
          .post(
            `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`,
            newTrack,
            headers
          )
          .then(() => {
            recebeMusicas(id);
            
          })
          .catch((erro) => {
            // alert("deu ruim");
            // alert(erro.response.data);
            console.log(erro.response.data.result.track);
          });
      };
      useEffect(() => {
        recebeMusicas(props.playlist.id);
      }, [props.playlist.id]);

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica value={artista} onChange={(e)=>{setArtista(e.target.value)}} placeholder="artista" />
                <InputMusica value={nome} onChange={(e)=>{setNome(e.target.value)}} placeholder="musica" />
                <InputMusica value={url} onChange={(e)=>{setUrl(e.target.value)}} placeholder="url" />
                <Botao onClick={()=>{addTracks(props.playlist.id)}}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

