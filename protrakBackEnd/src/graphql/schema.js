const path = require('path');
const { nexusPrismaPlugin } = require('nexus-prisma');
const { makeSchema } = require('@nexus/schema');

const { AddressType } = require('./types/enums/AddressType');
const { CompanyStatus } = require('./types/enums/CompanyStatus');
const { CompanyType } = require('./types/enums/CompanyType');
const { RoleType } = require('./types/enums/RoleType');

const { Address } = require('./types/Address');
const { BillingProfile } = require('./types/BillingProfile');
const { ChangeOrder } = require('./types/ChangeOrder');
const { City } = require('./types/City');
const { Client } = require('./types/Client');
const { ClientNote } = require('./types/ClientNote');
const { Company } = require('./types/Company');
const { Contact } = require('./types/Contact');
const { Country } = require('./types/Country');
const { Discount } = require('./types/Discount');
const { FeedComment } = require('./types/FeedComment');
const { FeedEntry } = require('./types/FeedEntry');
const { FeedMedia } = require('./types/FeedMedia');
const { FeedReaction } = require('./types/FeedReaction');
const { Invitation } = require('./types/Invitation');
const { Invoice } = require('./types/Invoice');
const { InvoiceLineItem } = require('./types/InvoiceLineItem');
const { InvoicePayment } = require('./types/InvoicePayment');
const { PaymentMethod } = require('./types/PaymentMethod');
const { Project } = require('./types/Project');
const { ProjectBudget } = require('./types/ProjectBudget');
const { ProjectTimeline } = require('./types/ProjectTimeline');
const { Proposal } = require('./types/Proposal');
const { Referral } = require('./types/Referral');
const { ShareLink } = require('./types/ShareLink');
const { State } = require('./types/State');
const { Subscription } = require('./types/Subscription');
const { SubscriptionDiscount } = require('./types/SubscriptionDiscount');
const { SubscriptionPayment } = require('./types/SubscriptionPayment');
const { Supplier } = require('./types/Supplier');
const { SupplierNote } = require('./types/SupplierNote');
const { User } = require('./types/User');
const { UserNotification } = require('./types/UserNotification');
const { UserRole } = require('./types/UserRole');

const { AddressQuery } = require('./resolvers/queries/Address');
const { BillingProfileQuery } = require('./resolvers/queries/BillingProfile');
const { ChangeOrderQuery } = require('./resolvers/queries/ChangeOrder');
const { CityQuery } = require('./resolvers/queries/City');
const { ClientQuery } = require('./resolvers/queries/Client');
const { ClientNoteQuery } = require('./resolvers/queries/ClientNote');
const { CompanyQuery } = require('./resolvers/queries/Company');
const { ContactQuery } = require('./resolvers/queries/Contact');
const { CountryQuery } = require('./resolvers/queries/Country');
const { DiscountQuery } = require('./resolvers/queries/Discount');
const { FeedCommentQuery } = require('./resolvers/queries/FeedComment');
const { FeedEntryQuery } = require('./resolvers/queries/FeedEntry');
const { FeedMediaQuery } = require('./resolvers/queries/FeedMedia');
const { FeedReactionQuery } = require('./resolvers/queries/FeedReaction');
const { InvitationQuery } = require('./resolvers/queries/Invitation');
const { InvoiceQuery } = require('./resolvers/queries/Invoice');
const { InvoiceLineItemQuery } = require('./resolvers/queries/InvoiceLineItem');
const { InvoicePaymentQuery } = require('./resolvers/queries/InvoicePayment');
const { PaymentMethodQuery } = require('./resolvers/queries/PaymentMethod');
const { ProjectQuery } = require('./resolvers/queries/Project');
const { ProjectBudgetQuery } = require('./resolvers/queries/ProjectBudget');
const { ProjectTimelineQuery } = require('./resolvers/queries/ProjectTimeline');
const { ProposalQuery } = require('./resolvers/queries/Proposal');
const { ReferralQuery } = require('./resolvers/queries/Referral');
const { ShareLinkQuery } = require('./resolvers/queries/ShareLink');
const { StateQuery } = require('./resolvers/queries/State');
const { SubscriptionQuery } = require('./resolvers/queries/Subscription');
const { SubscriptionDiscountQuery } = require('./resolvers/queries/SubscriptionDiscount');
const { SubscriptionPaymentQuery } = require('./resolvers/queries/SubscriptionPayment');
const { SupplierQuery } = require('./resolvers/queries/Supplier');
const { SupplierNoteQuery } = require('./resolvers/queries/SupplierNote');
const { UserQuery } = require('./resolvers/queries/User');
const { UserNotificationQuery } = require('./resolvers/queries/UserNotification');
const { UserRoleQuery } = require('./resolvers/queries/UserRole');

const { AddressMutation } = require('./resolvers/mutations/Address');
const { BillingProfileMutation } = require('./resolvers/mutations/BillingProfile');
const { ChangeOrderMutation } = require('./resolvers/mutations/ChangeOrder');
const { CityMutation } = require('./resolvers/mutations/City');
const { ClientMutation } = require('./resolvers/mutations/Client');
const { ClientNoteMutation } = require('./resolvers/mutations/ClientNote');
const { CompanyMutation } = require('./resolvers/mutations/Company');
const { ContactMutation } = require('./resolvers/mutations/Contact');
const { CountryMutation } = require('./resolvers/mutations/Country');
const { DiscountMutation } = require('./resolvers/mutations/Discount');
const { FeedCommentMutation } = require('./resolvers/mutations/FeedComment');
const { FeedEntryMutation } = require('./resolvers/mutations/FeedEntry');
const { FeedMediaMutation } = require('./resolvers/mutations/FeedMedia');
const { FeedReactionMutation } = require('./resolvers/mutations/FeedReaction');
const { InvitationMutation } = require('./resolvers/mutations/Invitation');
const { InvoiceMutation } = require('./resolvers/mutations/Invoice');
const { InvoiceLineItemMutation } = require('./resolvers/mutations/InvoiceLineItem');
const { InvoicePaymentMutation } = require('./resolvers/mutations/InvoicePayment');
const { PaymentMethodMutation } = require('./resolvers/mutations/PaymentMethod');
const { ProjectMutation } = require('./resolvers/mutations/Project');
const { ProjectBudgetMutation } = require('./resolvers/mutations/ProjectBudget');
const { ProjectTimelineMutation } = require('./resolvers/mutations/ProjectTimeline');
const { ProposalMutation } = require('./resolvers/mutations/Proposal');
const { ReferralMutation } = require('./resolvers/mutations/Referral');
const { ShareLinkMutation } = require('./resolvers/mutations/ShareLink');
const { StateMutation } = require('./resolvers/mutations/State');
const { SubscriptionMutation } = require('./resolvers/mutations/Subscription');
const {
  SubscriptionDiscountMutation,
} = require('./resolvers/mutations/SubscriptionDiscount');
const {
  SubscriptionPaymentMutation,
} = require('./resolvers/mutations/SubscriptionPayment');
const { SupplierMutation } = require('./resolvers/mutations/Supplier');
const { SupplierNoteMutation } = require('./resolvers/mutations/SupplierNote');
const { UserMutation } = require('./resolvers/mutations/User');
const { UserNotificationMutation } = require('./resolvers/mutations/UserNotification');
const { UserRoleMutation } = require('./resolvers/mutations/UserRole');

const schema = makeSchema({
  types: [
    AddressType,
    CompanyStatus,
    CompanyType,
    RoleType,

    Address,
    BillingProfile,
    ChangeOrder,
    City,
    Client,
    ClientNote,
    Company,
    Contact,
    Country,
    Discount,
    FeedComment,
    FeedEntry,
    FeedMedia,
    FeedReaction,
    Invitation,
    Invoice,
    InvoiceLineItem,
    InvoicePayment,
    PaymentMethod,
    Project,
    ProjectBudget,
    ProjectTimeline,
    Proposal,
    Referral,
    ShareLink,
    State,
    Subscription,
    SubscriptionDiscount,
    SubscriptionPayment,
    Supplier,
    SupplierNote,
    User,
    UserNotification,
    UserRole,

    AddressQuery,
    BillingProfileQuery,
    ChangeOrderQuery,
    CityQuery,
    ClientNoteQuery,
    ClientQuery,
    CompanyQuery,
    ContactQuery,
    CountryQuery,
    DiscountQuery,
    FeedCommentQuery,
    FeedEntryQuery,
    FeedMediaQuery,
    FeedReactionQuery,
    InvitationQuery,
    InvoiceLineItemQuery,
    InvoicePaymentQuery,
    InvoiceQuery,
    PaymentMethodQuery,
    ProjectBudgetQuery,
    ProjectQuery,
    ProjectTimelineQuery,
    ProposalQuery,
    ReferralQuery,
    ShareLinkQuery,
    StateQuery,
    SubscriptionDiscountQuery,
    SubscriptionPaymentQuery,
    SubscriptionQuery,
    SupplierNoteQuery,
    SupplierQuery,
    UserNotificationQuery,
    UserQuery,
    UserRoleQuery,

    AddressMutation,
    BillingProfileMutation,
    ChangeOrderMutation,
    CityMutation,
    ClientMutation,
    ClientNoteMutation,
    CompanyMutation,
    ContactMutation,
    CountryMutation,
    DiscountMutation,
    FeedCommentMutation,
    FeedEntryMutation,
    FeedMediaMutation,
    FeedReactionMutation,
    InvitationMutation,
    InvoiceLineItemMutation,
    InvoiceMutation,
    InvoicePaymentMutation,
    PaymentMethodMutation,
    ProjectBudgetMutation,
    ProjectMutation,
    ProjectTimelineMutation,
    ProposalMutation,
    ReferralMutation,
    ShareLinkMutation,
    StateMutation,
    SubscriptionDiscountMutation,
    SubscriptionMutation,
    SubscriptionPaymentMutation,
    SupplierMutation,
    SupplierNoteMutation,
    UserMutation,
    UserNotificationMutation,
    UserRoleMutation,
  ],
  plugins: [
    nexusPrismaPlugin({
      shouldGenerateArtifacts: false,
    }),
  ],
  outputs: {
    schema: path.join(__dirname, 'generated', 'schema.graphql'),
    typegen: path.join(__dirname, 'generated', 'nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});

module.exports = {
  schema,
};
