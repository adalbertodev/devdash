import { faker } from "@faker-js/faker";

import { GitHubRepository } from "../../../src/domain/GitHubRepository/GitHubRepository";

export class GitHubRepositoryMother {
	static create(params?: Partial<GitHubRepository>): GitHubRepository {
		const defaultParams: GitHubRepository = {
			id: {
				organization: faker.company.name(),
				name: faker.random.word(),
			},
			description: faker.random.words(10),
			url: faker.internet.url(),
			private: faker.datatype.boolean(),
			updatedAt: faker.datatype.datetime(),
			hasWorkflows: faker.datatype.boolean(),
			isLastWorkflowSuccess: faker.datatype.boolean(),
			stars: faker.datatype.number(),
			watchers: faker.datatype.number(),
			forks: faker.datatype.number(),
			issues: faker.datatype.number(),
			pullRequests: faker.datatype.number(),
			workflowRunsStatus: [],
			...params,
		};

		return defaultParams;
	}
}
