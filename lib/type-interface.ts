// Define a type for the link data
export interface AppLinkProps {
    id: string;
    href: string;
    icon?: string;
    label: string;
    shortLabel?: string;
    description?: string;
    category?: string;
    keywords?: string;
}

export interface ITabsData {
    text: string, 
    content: React.ReactNode,
}

export interface ILinkTabsData {
    label: string, 
    href: string,
}

export interface IVCardField {
    label: string; // The label for the field, e.g., 'Name', 'Organization'
    copy: boolean; // Whether the field's value should be copyable
    link: '' | 'web' | 'tel' | 'email'; // Type of link for the field
    value: string; // The value of the field
}

export interface IVCardError {
    description: string; // Error description
    attributes: {
        property: string; // The property that caused the error
        line: number; // Line number in the vCard where the error was found
    };
}


export interface IFormattedVCardData {
    fields: IVCardField[]; // Array of formatted vCard fields
    errors: IVCardError[] | null; // Array of errors, or null if there are no errors
}

export interface IVideoToolsDataProps {
    id: string,
    icon: string,
    title: string,
    description: string,
    route: string,
    isNew: boolean,
}