import type { INodeProperties } from 'n8n-workflow';

const showForEmail = { resource: ['email'] };

export const emailDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showForEmail },
		options: [
			{
				name: 'Analyze Headers',
				value: 'analyzeHeaders',
				action: 'Analyze email headers',
				description:
					'Read pasted email headers: SPF, DKIM and DMARC results, alignment, the delivery path and delays',
				routing: {
					request: {
						method: 'POST',
						url: '/header-check',
					},
				},
			},
			{
				name: 'Check Spam Words',
				value: 'checkSpam',
				action: 'Check an email for spam triggers',
				description:
					'Score the wording and format for the things spam filters react to, with a fix for each',
				routing: {
					request: {
						method: 'POST',
						url: '/spam-check',
					},
				},
			},
			{
				name: 'Check Subject Line',
				value: 'checkSubject',
				action: 'Score a cold email subject line',
				description: 'Score a cold email subject line out of 10, with what to change',
				routing: {
					request: {
						method: 'POST',
						url: '/subject-check',
					},
				},
			},
		],
		default: 'checkSpam',
	},
	{
		displayName: 'Headers',
		name: 'headers',
		type: 'string',
		typeOptions: { rows: 8 },
		default: '',
		required: true,
		description: 'The full headers of one email, the part above the message body',
		displayOptions: { show: { ...showForEmail, operation: ['analyzeHeaders'] } },
		routing: { send: { type: 'body', property: 'headers' } },
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		description: 'The subject line of the email',
		displayOptions: { show: { ...showForEmail, operation: ['checkSpam'] } },
		routing: { send: { type: 'body', property: 'subject' } },
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		typeOptions: { rows: 6 },
		default: '',
		required: true,
		description: 'The text of the email',
		displayOptions: { show: { ...showForEmail, operation: ['checkSpam'] } },
		routing: { send: { type: 'body', property: 'body' } },
	},
	{
		displayName: 'Subject Line',
		name: 'subjectLine',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'clients in denver',
		description: 'The subject line to score',
		displayOptions: { show: { ...showForEmail, operation: ['checkSubject'] } },
		routing: { send: { type: 'body', property: 'subject' } },
	},
];
