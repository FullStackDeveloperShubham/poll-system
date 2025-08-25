import gql from 'graphql-tag';

// Query to get all polls
export const GET_POLLS = gql`
query GetAllPolls {
  getAllPolls {
    question
    id
    answere
  }
}
`

// Define the types
type Poll = {
  id: string;
  question: string;
  answere: string[];
}

type PollsData = {
  polls: Poll[];
}

export type { Poll, PollsData };
