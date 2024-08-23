/**
 * Plaid SDK Assignment
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

export class InstitutionsSearchPost200ResponseInstitutionsInner {
    'countryCodes'?: Array<string>;
    'dtcNumbers'?: Array<string>;
    'institutionId'?: string;
    'name'?: string;
    'oauth'?: boolean;
    'products'?: Array<string>;
    'routingNumbers'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "countryCodes",
            "baseName": "country_codes",
            "type": "Array<string>"
        },
        {
            "name": "dtcNumbers",
            "baseName": "dtc_numbers",
            "type": "Array<string>"
        },
        {
            "name": "institutionId",
            "baseName": "institution_id",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "oauth",
            "baseName": "oauth",
            "type": "boolean"
        },
        {
            "name": "products",
            "baseName": "products",
            "type": "Array<string>"
        },
        {
            "name": "routingNumbers",
            "baseName": "routing_numbers",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return InstitutionsSearchPost200ResponseInstitutionsInner.attributeTypeMap;
    }
}

