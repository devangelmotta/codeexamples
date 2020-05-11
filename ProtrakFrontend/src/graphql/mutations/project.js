import gql from 'graphql-tag';

export const MUTATION_CREATE_PROJECT = gql`
  mutation MUTATION_CREATE_PROJECT(
    $name: String!
    $companyId: String!
    $amount: Float!
    $projectBudgetStatus: ProjectBudgetStatus!
    $projectTimelineStatus: ProjectTimelineStatus!
    $startDate: DateTime!
    $endDate: DateTime!
    $notes: String!
  ) {
    createOneProject(
      data: {
        name: $name
        companyId: { connect: { id: $companyId } }
        notes: $notes
        projectBudgets: { create: { amount: $amount, status: $projectBudgetStatus } }
        projectTimelines: {
          create: {
            startDate: $startDate
            endDate: $endDate
            status: $projectTimelineStatus
          }
        }
      }
    ) {
      id
    }
  }
`;

export const MUTATION_CREATE_PROJECT_CLIENT = gql`
  mutation MUTATION_CREATE_PROJECT_CLIENT(
    $nickname: String!
    $firstName: String!
    $lastName: String
    $email: String!
    $phone: String!
    $addressOne: String!
    $addressTwo: String
    $contactTypePhone: ContactType!
    $contactTypeEmail: ContactType!
    $projectId: String!
  ) {
    createOneClient(
      data: {
        nickname: $nickname
        firstName: $firstName
        lastName: $lastName
        contacts: {
          create: [
            { value: $phone, contactType: $contactTypePhone }
            { value: $email, contactType: $contactTypeEmail }
          ]
        }
        addresses: { create: { addressOne: $addressOne, addressTwo: $addressTwo } }
        projects: { connect: { id: $projectId } }
      }
    ) {
      id
    }
  }
`;

export const MUTATION_CREATE_PROJECT_WITH_NEW_CLIENT = gql`
  mutation MUTATION_CREATE_PROJECT_WITH_NEW_CLIENT(
    $name: String!
    $companyId: String!
    $amount: Float!
    $projectBudgetStatus: ProjectBudgetStatus!
    $projectTimelineStatus: ProjectTimelineStatus!
    $startDate: DateTime!
    $endDate: DateTime!
    $notes: String!
    $clientName: String!
    $clientEmail: String!
    $clientPhone: String!
    $contactTypePhone: ContactType!
    $contactTypeEmail: ContactType!
  ) {
    createOneProject(
      data: {
        name: $name
        companyId: { connect: { id: $companyId } }
        notes: $notes
        projectBudgets: { create: { amount: $amount, status: $projectBudgetStatus } }
        projectTimelines: {
          create: {
            startDate: $startDate
            endDate: $endDate
            status: $projectTimelineStatus
          }
        }
        clients: {
          create: {
            firstName: $clientName
            contacts: {
              create: [
                { value: $clientPhone, contactType: $contactTypePhone }
                { value: $clientEmail, contactType: $contactTypeEmail }
              ]
            }
          }
        }
      }
    ) {
      id
    }
  }
`;

export const MUTATION_CREATE_PROJECT_WITH_CLIENT = gql`
  mutation MUTATION_CREATE_PROJECT_WITH_CLIENT(
    $name: String!
    $companyId: String!
    $amount: Float!
    $projectBudgetStatus: ProjectBudgetStatus!
    $projectTimelineStatus: ProjectTimelineStatus!
    $startDate: DateTime!
    $endDate: DateTime!
    $notes: String!
    $clientId: String!
  ) {
    createOneProject(
      data: {
        name: $name
        companyId: { connect: { id: $companyId } }
        notes: $notes
        projectBudgets: { create: { amount: $amount, status: $projectBudgetStatus } }
        projectTimelines: {
          create: {
            startDate: $startDate
            endDate: $endDate
            status: $projectTimelineStatus
          }
        }
        clients: { connect: { id: $clientId } }
      }
    ) {
      id
    }
  }
`;

export default {
  MUTATION_CREATE_PROJECT,
  MUTATION_CREATE_PROJECT_CLIENT,
  MUTATION_CREATE_PROJECT_WITH_NEW_CLIENT,
  MUTATION_CREATE_PROJECT_WITH_CLIENT,
};
