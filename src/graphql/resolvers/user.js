import { ApolloError } from "apollo-server-express";
import { hash, compare } from 'bcryptjs';

import { issueToken, serializeUser } from '../../helpers'
import { UserRegistrationRules, UserAuthenticationRules } from '../../validators';

export default {
	Query: {
		authUserProfile: async (_, {}, { user }) => user,

		authenticateUser: async (_, { username, password }, { User }) => {
			await UserAuthenticationRules.validate({ username, password }, { abortEarly: false });
			try {
				let user = await User.findOne({ username });
				if (!user) {
					throw new Error("Username not found.");
				}
				let isMatch = await compare(password, user.password);
				if (!isMatch) {
					throw new Error("Invalid password.");
				}
				user = user.toObject();
				user.id = user._id;
				user = serializeUser(user);
				let token = await issueToken(user);
				return { user, token }
			} catch (err) {
				throw new ApolloError(err.message, 403);
			}
		}
	},
	Mutation: {
		registerUser: async (_, { newUser }, { User }) => {
			await UserRegistrationRules.validate(newUser, { abortEarly: false });
			try {
				let { email, username } = newUser
				let user = await User.findOne({ username });
				if (user) {
					throw new Error("Username is already taken.");
				}
				user = await User.findOne({ email });
				if (user) {
					throw new Error("Email is already registered.");
				}
				user = new User(newUser);
				user.password = await hash(newUser.password, 10);
				let result = await user.save();
				result = result.toObject();
				result.id = result._id;
				result = serializeUser(result);
				let token = await issueToken(result);
				return { token, user: result }
			} catch (err) {
				throw new ApolloError(err.message, 400);
			}
		}
	}
}