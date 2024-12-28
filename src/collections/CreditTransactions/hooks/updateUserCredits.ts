import { CollectionAfterChangeHook } from 'payload'

export const updateUserCredits: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req: { payload },
}) => {
  if (operation !== 'create') {
    console.log('Not a create operation, skipping credit update')
    return doc
  }

  try {
    console.log(`Updating credits for user ${doc.user}, amount: ${doc.amount}`)

    // Get current user credits
    const user = await payload.findByID({
      collection: 'users',
      id: doc.user,
    })
    console.log('user', user)

    if (!user) {
      console.error(`User ${doc.user} not found`)
      throw new Error(`User ${doc.user} not found`)
    }

    const currentCredits = user.credits || 0
    const newCredits = currentCredits + doc.amount

    console.log(`Current credits: ${currentCredits}, New credits: ${newCredits}`)

    // Update user's credit balance
    const updatedUser = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        credits: newCredits,
      },
    })

    console.log(`Successfully updated user credits to ${updatedUser.credits}`)
    return doc
  } catch (error) {
    console.error('Error in updateUserCredits hook:', error)
    throw error
  }
}
