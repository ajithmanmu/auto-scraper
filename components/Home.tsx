import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import Spec from './Spec';

const Home = ({ make }) => {
    const [ selectedMake, setSelectedMake ]  = useState();
    const [ selectedModel, setSelectedModel ]  = useState();
    const { data : models, error } = useSWR(selectedMake ? `model?make=${selectedMake}` : null, fetcher);
    const { data : variants, error: errorVariants } = useSWR(selectedMake && selectedModel ? `variant?make=${selectedMake}&model=${selectedModel}` : null, fetcher);
    if(error || errorVariants) return <div>Something went wrong...</div>
    return (
        <div className="md:container md:mx-auto">
        <div className="flex flex-row justify-items-start justify-start py-10">
            <div className="text-red font-bold rounded-lg border shadow-lg m-2.5 p-5">
                <select onChange={(evt)=>setSelectedMake(evt.target.value)}>
                    <option>Select a Make</option>
                    {
                        make.map((item)=><option value={item.make}>{item.make}</option>)
                    }
                </select>
            </div>
            {
                models ? 
                <div className="text-red font-bold rounded-lg border shadow-lg p-5 m-2.5 pr-2">
                    <select onChange={(evt)=>setSelectedModel(evt.target.value)}>
                        <option>Select a Model</option>
                        {
                            models.map((item:string)=><option value={item}>{item}</option>)
                        }
                    </select>
                </div> : null
            }
        </div>
        {
            selectedMake &&  selectedModel && variants? 
            <ul className="text-red font-bold rounded-lg border shadow-lg p-5 m-2.5">
                {variants.map((uid:string) => (
                    <li key={uid} className="m-2.5">
                        <Link 
                            href={{
                                pathname: `/spec/${encodeURIComponent(uid)}`,
                            }}
                        >
                            <a>{uid}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            : null
        }
    </div>
    )
};
export default Home;
