import { gql } from "@apollo/client";

export const DELETE_POLL = gql`
  mutation DeletePoll($id: ID!) {
    deletePoll(id: $id) {
      id
    }
  }
`;
