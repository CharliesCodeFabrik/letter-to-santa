import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import './../Sass/main_style.scss'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface FeedQuery {
  feed: {
    id: string
    url: string
    description: string
  }[]
}

const GET_LETTERS_QUERY = gql`
  query getLettersQuery {
    feed {
      id
      description
      url
    }
  }
`;


const POST_LETTER = gql`
  mutation AddTodo($description: String!, $url: String!){
      post(description: $description, url: $url) {
        id
      }
  }
`;



export function NewLetter(){

    const [show, setShow] = useState(false);
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState("");

    function updateSite (){
      
    }

    const [addTodo, { data, loading, error }] = useMutation(POST_LETTER);

    const handleClose = () => {
      setShow(false);
      addTodo({variables: {description: desc, url: url}, refetchQueries: [GET_LETTERS_QUERY]});
    };
    const handleShow = () => {setShow(true)};
    return(<div>
        <Button onClick={handleShow}>Schreibe einen Brief an Santa</Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schreibe dein Wunschzettel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label> Schreibe deine Wünsche auf <br/><input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/></label><br/>
            <label> Wo findet Santa deinen Wunsch<br/><input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/></label>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Schliessen
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Absenden
          </Button>
        </Modal.Footer>
      </Modal>

    </div>);
}



