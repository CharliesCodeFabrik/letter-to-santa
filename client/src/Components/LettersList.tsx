import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import './../Sass/main_style.scss'
import Table from 'react-bootstrap/Table';
import DeleteButton from './DeleteButton';




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

export function LettersList() {

  const { loading, error, data } = useQuery<FeedQuery>(GET_LETTERS_QUERY);

  return (
    <div>
      <h3>Available Inventory</h3>
      <div className='lettersListClass'>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <Table striped bordered hover size='m'>
          <thead>
            <tr>
              <th>IDs</th>
              <th>Wunsch</th>
              <th>Wo?</th>  
            </tr>
          </thead>
          <tbody>
            {data?
                data.feed.map(({id, description, url}) => (
                  <tr>
                    <td>{id}</td>
                    <td>{description}</td>
                    <td>{url}</td>
                    <td><DeleteButton deleteID={id}/></td>
                  </tr>
                ))
            :
              <tr>
              <td>Letter ID: -1</td>
              <td>Letter Description: Keine</td>
              <td>Letter Url: Keine</td>
            </tr>
            }
          </tbody>
        </Table>
      )}   
      </div>
    </div>

  );

}

export default LettersList