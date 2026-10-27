# n8n-nodes-pipefire

Free email deliverability checks from [Pipefire](https://pipefire.ai?utm_source=n8n), as an n8n community node. No account and no API key.

[Pipefire](https://pipefire.ai?utm_source=n8n) is done-for-you cold email software for agencies. This node runs the same checks as the [free tools on pipefire.ai](https://pipefire.ai/tools?utm_source=n8n), so an answer here matches the answer on the website.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation and install `n8n-nodes-pipefire`.

## Operations

| Resource | Operation | What it does |
| --- | --- | --- |
| Domain | Check Authentication | MX, SPF, DKIM, DMARC, BIMI and MTA-STS for a domain, with a finding and a fix for each record |
| Domain | Check Blacklists | The sending IPs of a domain, or one IPv4 address, against the main DNS blacklists |
| Email | Check Spam Words | Scores the wording and format of an email for what spam filters react to, with a fix for each |
| Email | Check Subject Line | Scores a cold email subject line out of 10, with what to change |
| Email | Analyze Headers | Reads pasted email headers: SPF, DKIM and DMARC results, alignment, the delivery path and delays |

The node can also be used as a tool by n8n's AI Agent, so an agent can check a domain or a draft email on its own.

## Credentials

None. The checks are free and public. They are rate limited per IP address, so a very large loop will be slowed down.

## Compatibility

Tested with n8n 2.45.4.

## Usage

**Check a new client's domain before sending.** Trigger on a new row in a sheet, run Domain > Check Authentication on the domain column, then use an IF node on `rows` where `state` is `fail` to flag what needs fixing.

**Check a draft before it goes out.** Run Email > Check Spam Words on the subject and body of a draft. The output has a `score` out of 10 and a list of findings, each with `why` and `fix`.

**Give an AI agent deliverability checks.** Add the Pipefire node as a tool on an AI Agent node. Ask it "is example.com set up to send cold email?" and it runs Check Authentication itself.

Each finding links to the matching Pipefire guide, so you can read why a check failed.

## Resources

* [Pipefire free tools](https://pipefire.ai/tools?utm_source=n8n)
* [Pipefire cold email guides](https://pipefire.ai/guides?utm_source=n8n)
* [Pipefire MCP server](https://pipefire.ai/mcp-server?utm_source=n8n) and [command-line tool](https://github.com/mikelovatt/pipefire-cli), which run the same checks
* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## Version history

* 0.1.1: published from GitHub Actions with npm provenance.
* 0.1.0: first release. Five operations, no credentials.
