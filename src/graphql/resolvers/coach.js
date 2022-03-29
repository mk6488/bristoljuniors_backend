import { ApolloError } from 'apollo-server-express'

import { coachPaginatorLabels } from '../../helpers'

export default {
	Query: {
		getAllCoaches: async (_, {}, { Coach }) => {
			let result = await Coach.find().populate('author')
			return result
		},

		getCoachById: async (_, { id }, { Coach }) => {
			try {
				let result = await Coach.findById(id)
				if (!result) {
					throw new Error("Coach not found.")
				}
				await result.populate('author').execPopulate()
				return result
			} catch (err) {
				throw new ApolloError(err.message)
			}
		},

		getAllCoachesPaginated: async (_, { page, limit }, { Coach }) => {
			const options = {
				page: page || 1,
				limit: limit || 10,
				sort: { date: -1 },
				populate: 'author',
				customLabels: coachPaginatorLabels
			}
			let result = await Coach.paginate({}, options)
			return result
		},

		// getAllMyCoachesPaginated: async (_, { page, limit }, { user, Coach }) => {
		// 	const options = {
		// 		page: page || 1,
		// 		limit: limit || 10,
		// 		sort: { date: -1 },
		// 		populate: 'author',
		// 		customLabels: coachPaginatorLabels
		// 	}
		// 	let result = await Coach.paginate({ author: user._id.toString() }, options)
		// 	return result
		// }
	},

	Mutation: {
		createNewCoach: async (_, { newCoach }, { user, Coach }) => {
			let result = await Coach.create({ ...newCoach, author: user._id })
			await result.populate('author').execPopulate()
			return result
		},

		editCoachById: async (_, { id, updatedCoach }, { user, Coach }) => {
			try {
				let result = await Coach.findOneAndUpdate({ _id: id, author: user._id.toString() }, { ...updatedCoach }, { new: true })
				if (!result) {
					throw new Error('You are not authorized to edit this Coach.')
				}
				return result
			} catch (err) {
				throw new ApolloError(err.message, 400)
			}
		},

		deleteCoachById: async (_, { id }, { user, Coach }) => {
			try {
				let result = await Coach.findOneAndDelete({ _id: id, author: user._id.toString() })
				if (!result) {
					throw new Error('You are not authorized to delete this Coach.')
				}
				return {
					success: true,
					id: result.id,
					message: "Coach deleted!"
				}
			} catch (err) {
				throw new ApolloError(err.message, 400)
			}
		}
	}
}