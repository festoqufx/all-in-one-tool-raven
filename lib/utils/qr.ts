/* eslint-disable @typescript-eslint/no-explicit-any */
import vCard from 'vcf';
import { IFormattedVCardData } from "@/lib/type-interface";

// Function to parse a vCard string
export const getVCardData = (vcardString: string) => {
    try {
        const vcard = vCard.parse(vcardString)[0];
        console.log('Parsed vCard:', vcard);
        return vcard;
    } catch (error) {
        console.error('Error parsing vCard:', error);
        return null;
    }
};

// Function to check if a string is a vCard
export const isVCard = (str: string): boolean => {
    return str.includes('BEGIN:VCARD') && str.includes('END:VCARD');
};


export const formatVCardData = (data: any): IFormattedVCardData | null => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
    }
    console.log('formatVCardData 1:', data);
    // Extract the first vCard if there are multiple
    const vCard = data[1];
    console.log('formatVCardData 2:', vCard);

    // Initialize default values
    let name = '';
    let organization = '';
    let title = '';
    let url = '';
    let telephone = '';
    let email = '';

    // Iterate over the vCard fields
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    vCard.forEach(([type, params, valueType, value]: [string, any, string, any]) => {
        switch (type) {
            case 'fn':
                name = value;
                break;
            case 'n':
                name = `${value[1]} ${value[0]}`; // Format as "GivenName FamilyName"
                break;
            case 'org':
                organization = value;
                break;
            case 'title':
                title = value;
                break;
            case 'url':
                url = value.startsWith('http') ? value : `http://${value}`;
                break;
            case 'tel':
                telephone = value;
                break;
            case 'email':
                email = value;
                break;
            default:
                break;
        }
    });

    const formattedData: IFormattedVCardData = {
        fields: [
            { label: 'Name', copy: false, link: '', value: name },
            { label: 'Organization', copy: false, link: '', value: organization },
            { label: 'Title', copy: false, link: '', value: title },
            { label: 'URL', copy: true, link: 'web', value: url },
            { label: 'Telephone', copy: true, link: 'tel', value: telephone },
            { label: 'Email', copy: true, link: 'email', value: email },
        ],
        errors: [] // Adjust error handling as needed
    };

    console.log('formatVCardData 3:', formattedData);
    return formattedData;
};


// export const formatVCardData = (data: any) => {
//     if (!data || !data.length) {
//         return null;
//     }

//     const vCard = data[0];
    
//     const name = `${vCard.fn || ''} (${vCard.n.familyName || ''} ${vCard.n.givenName || ''})`;
//     const formattedData = {
//         fields: [
//             { label: 'Name', copy: false, link: '', value: name },
//             { label: 'Organization', copy: false, link: '', value: vCard.org?.join(', ') },
//             { label: 'Title', copy: false, link: '', value: vCard.title },
//             { label: 'URL', copy: true, link: 'web', value: vCard.url },
//             { label: 'Telephone', copy: true, link: 'tel', value: vCard.tel?.join(', ') },
//             { label: 'Email', copy: true, link: 'email', value: vCard.email?.join(', ') },
//         ],
//         errors: vCard.errors || null
//     };
//     return formattedData;
// };
