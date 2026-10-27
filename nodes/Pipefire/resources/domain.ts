import type { INodeProperties } from 'n8n-workflow';

const showForDomain = { resource: ['domain'] };

export const domainDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showForDomain },
		options: [
			{
				name: 'Check Authentication',
				value: 'checkAuthentication',
				action: 'Check the email authentication of a domain',
				description:
					'Check MX, SPF, DKIM, DMARC, BIMI and MTA-STS for a domain, with a finding and a fix for each record',
				routing: {
					request: {
						method: 'POST',
						url: '/domain-check',
					},
				},
			},
			{
				name: 'Check Blacklists',
				value: 'checkBlacklists',
				action: 'Check a domain or IP against blacklists',
				description: 'Check the sending IPs of a domain, or a single IPv4 address, against the main DNS blacklists',
				routing: {
					request: {
						method: 'POST',
						url: '/blacklist-check',
					},
				},
			},
		],
		default: 'checkAuthentication',
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'example.com',
		description: 'The domain to check, without https:// or www',
		displayOptions: { show: { ...showForDomain, operation: ['checkAuthentication'] } },
		routing: { send: { type: 'body', property: 'domain' } },
	},
	{
		displayName: 'DKIM Selector',
		name: 'selector',
		type: 'string',
		default: '',
		placeholder: 'google',
		description:
			'Optional. The DKIM selector your email provider uses. Leave empty to try the common ones.',
		displayOptions: { show: { ...showForDomain, operation: ['checkAuthentication'] } },
		routing: { send: { type: 'body', property: 'selector' } },
	},
	{
		displayName: 'Domain or IP',
		name: 'target',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'example.com',
		description: 'A domain, or a single public IPv4 address',
		displayOptions: { show: { ...showForDomain, operation: ['checkBlacklists'] } },
		routing: { send: { type: 'body', property: 'target' } },
	},
];
