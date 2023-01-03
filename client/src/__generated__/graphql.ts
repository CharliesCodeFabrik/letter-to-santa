/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Letter = {
  __typename?: 'Letter';
  description: Scalars['String'];
  id: Scalars['Int'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  post: Letter;
};


export type MutationPostArgs = {
  description: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Letter>;
  letter?: Maybe<Letter>;
};


export type QueryLetterArgs = {
  id: Scalars['Int'];
};

export type GetRocketInventoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRocketInventoryQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Letter', id: number, description: string, url: string }> };


export const GetRocketInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRocketInventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetRocketInventoryQuery, GetRocketInventoryQueryVariables>;