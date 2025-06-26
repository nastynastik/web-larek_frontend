import { successTemplate, popup } from '..';
import { cloneTemplate } from '../utils/utils';
import { Success } from './order';

export const apiCache: Record<string, any> = {};

export function handleSuccess(res: any) {
	const success = new Success(cloneTemplate(successTemplate), {
		onClick: () => {
			popup.close();
		},
	});
	popup.render({
		content: success.render({
			total: res.total,
		}),
	});
}