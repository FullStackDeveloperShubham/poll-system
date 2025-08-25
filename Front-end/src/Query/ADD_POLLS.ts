import gql from 'graphql-tag';

type createPollType = {
    question: string;
    answere: string[];
}

type createPollInput = {
    question: string;
    answere: string[];
}

// Mutation to add a new poll
export const ADD_POLL = gql`
mutation CreatePoll($input: PollInput) {
  createPoll(input: $input) {
    question
    answere
  }
}
`


export type { createPollInput, createPollType };
