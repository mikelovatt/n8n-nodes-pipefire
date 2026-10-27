import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { domainDescription } from './resources/domain';
import { emailDescription } from './resources/email';

export class Pipefire implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pipefire',
		name: 'pipefire',
		icon: { light: 'file:pipefire.svg', dark: 'file:pipefire.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Free email deliverability checks from Pipefire: SPF, DKIM, DMARC, blacklists, spam words, subject lines and email headers',
		defaults: {
			name: 'Pipefire',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [],
		requestDefaults: {
			baseURL: 'https://pipefire.ai/api/public/tools',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Domain',
						value: 'domain',
					},
					{
						name: 'Email',
						value: 'email',
					},
				],
				default: 'domain',
			},
			...domainDescription,
			...emailDescription,
		],
	};
}
