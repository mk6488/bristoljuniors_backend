import { model, Schema } from 'mongoose'
import paginator from 'mongoose-paginate-v2'

const CoachSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
    lastName: {
			type: String,
			required: true
		},
    mobile: {
			type: String,
			required: true
		},
    email: {
			type: String,
			required: true
		},
    clubMember: {
			type: Boolean,
			required: true
		},
    dbsNumber: {
			type: String,
			required: false
		},
    dbsDate: {
			type: String,
			required: false
		},
    SafeguardingDate: {
			type: String,
			required: false
		},
    roll: {
			type: String,
			required: false
		}
	// author: {
	// 	ref: 'users',
	// 	type: Schema.Types.ObjectId
	// }
}, { timestamps: true })

CoachSchema.plugin(paginator)

const Coach = model('coach', CoachSchema)

export default Coach