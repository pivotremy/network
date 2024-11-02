import { createHmac } from 'crypto';
import { Webhook, WebhookTrigger } from '@prisma/client';

import { MediaTypeNames } from '@/constants/media-type-names';
import { HttpMethod } from '@/types/http-method';

type Response = {
  ok: boolean;
  status: number;
  message: string;
  publishedAt: Date;
};

export async function sendPayload<T>(
  webhook: Pick<Webhook, 'url' | 'secret'>,
  trigger: WebhookTrigger,
  payload: T
): Promise<Response> {
  if (!webhook || !webhook.url) {
    throw new Error('Missing required elements to send webhook payload.');
  }

  const now = new Date();
  const body = JSON.stringify({
    trigger,
    createdAt: now.toISOString(),
    payload
  });

  const secretSignature = webhook.secret
    ? createHmac('sha256', webhook.secret).update(body).digest('hex')
    : 'no-secret-provided';

  const response = await fetch(webhook.url, {
    method: HttpMethod.Post,
    headers: {
      'Content-Type': MediaTypeNames.Application.Json,
      'X-Webhook-Signature-256': secretSignature
    },
    body
  });

  const text = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    message: text,
    publishedAt: now
  };
}
