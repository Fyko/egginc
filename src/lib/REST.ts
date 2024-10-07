import { Buffer } from 'node:buffer';
import { URLSearchParams } from 'node:url';
import { CLIENT_VERSION, PLATFORM_STRING } from '../constants.js';
import { ei } from '../proto/ei.js';

export class REST {
	protected readonly apiBase = 'https://ctx-dot-auxbrainhome.appspot.com';

	public async firstContact(eid: string): Promise<ei.EggIncFirstContactResponse> {
		const request = new ei.EggIncFirstContactRequest({
			rinfo: this.generateBasicRequestInfo(eid),
			ei_user_id: eid,
		});
		const bytes = request.serialize();

		const params = new URLSearchParams();
		params.set('data', Buffer.from(bytes).toString('base64'));

		const response = await fetch(`${this.apiBase}/ei/bot_first_contact`, {
			method: 'POST',
			body: params,
		});
		const data = Buffer.from(await response.text(), 'base64');

		return ei.EggIncFirstContactResponse.deserialize(data);
	}

	private generateBasicRequestInfo(eid: string) {
		return new ei.BasicRequestInfo({
			ei_user_id: eid,
			client_version: CLIENT_VERSION,
			platform: PLATFORM_STRING,
		});
	}
}
