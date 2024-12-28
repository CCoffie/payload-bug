import { CollectionConfig } from 'payload'
import { updateUserCredits } from './hooks/updateUserCredits'

export const CreditTransactions: CollectionConfig = {
  slug: 'credit-transactions',
  admin: {
    useAsTitle: 'transaction_id',
    description: 'Credit transactions history',
    defaultColumns: ['transaction_id', 'user', 'amount', 'type'],
  },
  hooks: {
    afterChange: [updateUserCredits],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'transaction_id',
      type: 'text',
      required: false,
      unique: true,
      admin: {
        description: 'Paddle Transaction ID (for purchases only)',
      },
      index: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Purchase', value: 'purchase' },
        { label: 'Usage', value: 'usage' },
        { label: 'Adjustment', value: 'adjustment' },
      ],
      admin: {
        description: 'Type of credit transaction',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'User associated with this transaction',
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      admin: {
        description: 'Number of credits (positive for additions, negative for deductions)',
      },
    },
    {
      name: 'note',
      type: 'text',
      required: false,
      admin: {
        description: 'Additional details about the transaction',
      },
    },
  ],
  timestamps: true,
}
