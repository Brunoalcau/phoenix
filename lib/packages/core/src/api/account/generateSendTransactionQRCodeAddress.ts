/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../burstService';

/**
 * Generate the URL for a QR Code for a given BURST address. Useful for IMG tags in HTML.
 * @param {string} receiverId The recipient burst address
 * @param {string} amountNQT The amount (in NQT) to request
 * @param {string} feeSuggestionType The fee suggestion type string
 * @return {Promise<string>}
 */
export const generateSendTransactionQRCodeAddress = (service: BurstService):
    (
        receiverId: string,
        amountNQT?: number,
        feeSuggestionType?: string
    ) => Promise<string> =>
    (
        receiverId: string,
        amountNQT: number = 0,
        feeSuggestionType: string = 'standard'
    ): Promise<string> =>
        Promise.resolve(
            service.toBRSEndpoint('generateSendTransactionQRCode', {
                    receiverId: receiverId,
                    amountNQT,
                    feeSuggestionType
                }
            )
        );
