// app/ip-insights/page.tsx

import { Metadata } from 'next';
import { IPAddressTool } from '@/components/ip/IPAddressTool';


export const metadata: Metadata = {
    title: 'Get my IP address',
    description: 'What is my IP address? Find out your public IP address with this tool.',
    keywords: 'What is my IP address?, get my IP address, get public IP address, ip address, ip, my ip, web app',
};

export default function MyIPHomePage() {

    return (
        <main>
            <h1 className='sr-only'>
                {"Find your public IP address details, find any public IP address details, find any domain, URL, or website's IP address details."}
            </h1>
            <h2 className='sr-only'>{metadata.title as string}</h2>
            <h2 className='sr-only'>{metadata.description as string}</h2>
            
            <h2 className='text-center text-lg md:text-xl xl:text-2xl font-black'>Get any IP address details</h2>

            <section className='min-h-screen flex flex-col items-center gap-4 py-4'>
                <IPAddressTool />
            </section>
        </main>
    );
}
