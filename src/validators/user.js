import * as yup from 'yup'

const firstName = yup.string().required()
const lastName = yup.string().required()
const username = yup.string().required().matches(/^\w+$/)
const email = yup.string().required().email()
const password = yup.string().required().min(5)

export const UserRegistrationRules = yup.object().shape({
	firstName,
	lastName,
	username,
	email,
	password
})

export const UserAuthenticationRules = yup.object().shape({
	username,
	password
})