import { useState } from 'react';
import client from '../lib/api';

export default ({ onResponse, onError }) => {
    const [webhookUrl, setWebhookUrl] = useState('');
    const [secretKey, setSecretKey] = useState('');

    async function generateWebhook() {
        const payload = {
            data: {
                attributes: {
                    events: ['source.chargeable'],
                    url: webhookUrl,
                },
            },
        };

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(secretKey)}`,
        };

        try {
            const { data: responseData } = await client.post('/webhooks', payload, { headers });

            onResponse(responseData);
        } catch (err) {
            onError(err);
        }
    }

    return (
        <form>
            <div className="flex flex-col pt-2">
                <label className="text-base font-semibold" htmlFor="webhook_url">Webhook URL</label>
                <input
                    className="text-base border rounded h-8 p-2 mt-1"
                    type="text"
                    name="webhook_url"
                    value={webhookUrl}
                    onChange={e => setWebhookUrl(e.target.value)}
                />
            </div>
            <div className="flex flex-col pt-4">
                <label className="text-base font-semibold" htmlFor="secret_key">Secret Key</label>
                <input
                    className="text-base border rounded h-8 p-2 mt-1"
                    type="text"
                    name="secret_key"
                    value={secretKey}
                    onChange={e => setSecretKey(e.target.value)}
                />
            </div>
            <button
                className="mt-4 p-2 w-full rounded bg-orange-600 text-white font-semibold"
                type="button"
                onClick={generateWebhook}>
                Generate
            </button>
        </form>
    )
}
