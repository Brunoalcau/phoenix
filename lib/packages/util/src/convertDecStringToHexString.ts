/**
 Original work Copyright (c) 2020 Burst Apps Team
 */
import './internal/padStartPolyfill';
import BigNumber from 'bignumber.js';


/**
 * @internal
 * @param bn
 */
const twosComplementBinary = (bn: BigNumber) => {
    // we manually implement our own two's complement (flip bits, add one)
    let bin = bn.multipliedBy(-1).toString(2);
    while (bin.length % 8) {
        bin = '0' + bin;
    }
    const prefix = ('1' === bin[0] && -1 !== bin.slice(1).indexOf('1')) ? '11111111' : '';
    bin = bin.split('').map(i => '0' === i ? '1' : '0').join('');
    return new BigNumber(prefix + bin, 2).plus(1);
};

/**
 * Arbitrary length decimal to hexadecimal conversion
 *
 * @note: Negative numbers are expressed as Two's Complement (https://en.wikipedia.org/wiki/Two%27s_complement)
 * Credits to AJ ONeal for the two's complements stuff
 * https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/
 *
 * @param decimal A decimal string or BigNumber representation
 * @param padding If set the hex string will be padded to given number, 8 or 16 or more
 * @return A hexadecimal string
 * @module util
 */
export const convertDecStringToHexString = (decimal: BigNumber | string, padding: number = 2 ): string => {
    let bn = typeof decimal === 'string' ? new BigNumber(decimal) : decimal;

    if (bn.isNaN()) {
        throw new Error(`Invalid decimal argument: [${decimal}] - Expected a valid decimal value`);
    }

    if (padding < 0) {
        throw new Error(`Invalid padding argument: [${padding}] - Expected a positive value`);
    }

    const isNegative = bn.lt(0);
    if (isNegative) {
        bn = twosComplementBinary(bn);
    }
    const hex = bn.toString(16);
    const padSize = Math.ceil(hex.length / padding);
    // @ts-ignore
    return hex.padStart(padSize * padding, isNegative ? 'f' : '0');
};
