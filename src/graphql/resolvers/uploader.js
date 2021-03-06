import { createWriteStream } from 'fs';
import { join, parse } from 'path';

import { URL } from '../../config';

export default {
	Query: {
		info: (_, {}, context) => "Hello I am Uploader Resolver Methods."
	},
	Mutation: {
		uploader: async (_, { file }) => {
			let { filename, createReadStream } = await file;

			let stream = createReadStream();

			let { ext, name, } = parse(filename);

			name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');

			let serverFile = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);

			let writeStream = await createWriteStream(serverFile);
			await stream.pipe(writeStream);

			serverFile = `${URL}${serverFile.split('uploads')[1]}`;

			return serverFile;
		}
	}
}