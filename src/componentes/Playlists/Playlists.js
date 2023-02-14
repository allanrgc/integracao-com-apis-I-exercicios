import React, {  useEffect ,useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

function Playlists() {
    const [playlists, setPlaylists] = useState([])

    const headers = {
        headers: {
          Authorization: "allan-rafael-conway"
        }
      };
      const recebePlaylists = (props) => {
        axios
          .get(
            "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
            headers
          )
          .then((resposta) => {
            setPlaylists(resposta.data.result.list);
          })
          .catch((erro) => {
            // alert("deu ruim");
            alert(erro.response.data);
            console.log(erro.response.data);
          });
      };
      useEffect(() => {
        recebePlaylists();
      }, []);
  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas 
                key={playlist.id} 
                playlist={playlist}
                
                />
            })}

        </div>
    );
}

export default Playlists;
