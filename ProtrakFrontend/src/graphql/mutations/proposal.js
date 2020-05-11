import gql from 'graphql-tag';

export const MUTATION_CREATE_PROPOSAL = gql`
  mutation MUTATION_CREATE_PROPOSAL(
    $name: String!
    $proposalOwnerId: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $budgetProposed: Float!
    $details: String!
    $status: ProposalStatus!
  ) {
    createOneProposal(
      data: {
        name: $name
        proposalOwnerId: { connect: { id: $proposalOwnerId } }
        startDate: $startDate
        endDate: $endDate
        budgetProposed: $budgetProposed
        details: $details
        status: $status
      }
    ) {
      id
    }
  }
`;

export default {
  MUTATION_CREATE_PROPOSAL,
};
