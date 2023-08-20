import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ExtendaElement extends LightningElement {

	errorMessage = '';

	/* 
	For certain LWC extending issues with legacy Lightning Locker (not needed with LWS)
	https://github.com/salesforce/lwc/issues/3235 
	*/
	@api 
	dispatchEventFromExtended(event) {
		this.dispatchEvent(event);
	}

	/**
	 * Debug an Object
	 * @param object - object to log
	 * @return undefined
	 */
	debug(obj) {
		console.info(JSON.parse(JSON.stringify({
			...obj,
		})));
	}

	/**
	 * Handle errors
	 * @param error - error object
	 * @param dimissable - whether the toast is dismissable (optional)
	 * @return undefined
	 */
	handleError(error, dimissable = true) {

		const rawMessage = error?.body?.message || error?.message || error;

		const message = Array.isArray(rawMessage) 
			? rawMessage.map(x => x.message).join('')
			: [rawMessage];

		console.warn(error)
		this.errorMessage = message.join('\n');
		this.toast(
			'error', 
			message, 
			'Error',
			dimissable ? 'dismissable' : 'sticky',
		);
	}

	/* 
	* @description Toast messages to the user
	* @param config - toast config object
	* @property variant - type of toast (error, success, etc.)
	* @property message - message to display
	* @property title - title of the toast (optional)
	* @property mode - mode of the toast (dismissable, sticky, etc.)
	* @return true
	*/
	toast(config = {}) {
		
		const {
			variant, 
			message, 
			title, 
			mode = 'dismissable',
		} = config;

		const m = mode ? mode : 'dismissable';

		const t = title ? title : variant === 'error' ? 'Error' : 'Success';

		this.dispatchEvent(new ShowToastEvent({
			message,
			variant,
			title: t,
			mode: m,
		}));

		return true;
	}
}