import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import './../Sass/main_style.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';




interface FeedQuery {
  feed: {
    id: number
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

const DELETE_LETTERS_MUTATION = gql`
  mutation DeleteLetter($delete_id: Int!) {
    delete (id: $delete_id){
      id
      description
      url
    }
  }
`;

const DeleteButton: React.FC<{deleteID:number}> = ({deleteID}) => {

  const [deleteLetter] = useMutation(DELETE_LETTERS_MUTATION);
  function del() {
    deleteLetter({variables: {delete_id: deleteID}, refetchQueries:[GET_LETTERS_QUERY]});
  }
    return (
    <div>
      <Button variant='danger' onClick={del}>Löschen</Button>
    </div>);
}

export default DeleteButton