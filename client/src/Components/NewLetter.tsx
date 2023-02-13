import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import './../Sass/main_style.scss'
import Stack from 'react-bootstrap/Stack';
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

    const [addTodo, { data, loading, error }] = useMutation(POST_LETTER);

    const handleClose = () => {
      setShow(false);
      addTodo({variables: {description: desc, url: url}, refetchQueries: [GET_LETTERS_QUERY]});
    };
    const handleShow = () => {setShow(true)};
    return(<div>
        <Button variant='outline-info' size='lg' onClick={handleShow}>add products</Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack gap={3}>
              <div>
                <label> Product Name <br/><input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/></label><br/>
              </div>
              <div>
                <label> Place to find?<br/><input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/></label>
              </div>
            </Stack>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abort
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

    </div>);
}



