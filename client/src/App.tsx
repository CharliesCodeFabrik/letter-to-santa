import React from 'react';

import { useQuery } from '@apollo/client';


import { gql } from '../src/__generated__/gql';


const GET_ROCKET_INVENTORY = gql(/* GraphQL */ `

  query GetRocketInventory {

    feed {

      id

      description

      url

    }

  }

`);


export function LettersList() {

  // our query's result, data, is typed!

  const { loading, data } = useQuery(
    GET_ROCKET_INVENTORY
  );

  return (

    <div>

      <h3>Available Inventory</h3>

      {loading ? (

        <p>Loading ...</p>

      ) : (

        <table>

          <thead>

            <tr>

              <th>Letters</th>

              <th>{}</th>

            </tr>

          </thead>

          <tbody>
            {data?
                data.feed.map(({id, description, url}) => (

                  <tr>
    
                    <td>Letter ID:{id}</td>
    
                    <td>Letter Description:{description}</td>
    
                    <td>Letter Description:{url}</td>
    
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

        </table>

      )}

    </div>

  );

}

export default LettersList