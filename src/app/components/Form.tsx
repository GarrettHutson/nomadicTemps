'use client'
import {  useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'
import { useGlobalContext } from '../context/store';
import Image from 'next/image'
interface FormState {
    title: string;
    description: string;
    email: string;
    profession: string;
    budget: string;
    location: string;
    start: string;
    end: string;
    img: string | ArrayBuffer;
}

export const revalidate = 0

const MyForm: React.FC = () => {
    const { user } = useUser()
    const router = useRouter();
const {allJobs, setAllJobs} = useGlobalContext();

    const initialFormState: FormState = {

        title: '',
        description: '',
        email: `${user?.emailAddresses[0].emailAddress}`,
        profession: '',
        budget: '',
        location: '',
        start: '',
        end: '',
        img: '',

    };
    const [formState, setFormState] = useState<FormState>(initialFormState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result;
       
          setFormState((prevState) => ({
            ...prevState,
            img: base64Data,
          }));
        };
        reader.readAsDataURL(file);
      }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const timestamp = Date.now();
        const urlWithTimestamp = `/api/post?t=${timestamp}`;
       
        const res = await fetch(urlWithTimestamp, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: formState.title,
                description: formState.description,
                email: formState.email,
                profession: formState.profession,
                budget: formState.budget,
                location: formState.location,
                start: formState.start,
                end: formState.end,
                img: formState.img,
            }),
        });
        const newRes = await res.json()
        setAllJobs(newRes.allJobs)
        router.push('/jobs')

    };

    return (
        <div className='my-auto flex w-4/5 justify-center h-[90%] gap-4'>
            <div className=' pb-24 flex flex-col border-2 w-2/5 h-full  justify-center border-black border-opacity-40 op'>
                <Image
                    className='pb-36'
                    src='/.././public/image.png'
                    alt='something'
                    width={500}

                    height={300} />
                <div>
                    <p className='text-md m-2'>{formState.email === '' ? 'https://exampleEmail.com' : formState.email}</p>
                    <h1 className='text-2xl m-2'>{formState.title === '' ? 'TitleExample' : formState.title}</h1>
                    <p className='text-2xl m-2 overflow-auto'>{formState.description === '' ? 'This is a long description of what you need people to do for you in exchange for that chedda!' : formState.description}</p>
                    <div className='flex  m-2'>
                        {/* <img className='w-full border-black border-2 m-2 border-opacity-40' src={formState.img === '' ? null : formState.img } /> */}
                        {formState.img !== '' ? <Image
                            className=" m-2 "
                            // src={formState.img === "" ? '' : formState.img}
                            alt="selected image"
                            src={`${formState.img}`}
                            width={200}
                            height={200}

                        />
                            :
                            <div className=' w-48 h-48 rounded-lg bg-gray-400  '></div>}

                        <div className='flex flex-col m-2'>
                            <div className='bg-black text-white p-1 mx-2 my-1'>{formState.profession === '' ? 'PROFESSION' : formState.profession}</div>
                            <div className='border-2 border-black p-1   mx-2 my-1'>{formState.budget === '' ? '$$$' : formState.budget}</div>
                            <div className='border-2 border-black p-1 mx-2 my-1'>{formState.start === '' ? 'Date Range' : formState.start}</div>
                            <div className='border-2 border-black p-1  mx-2 my-1'>{formState.location === '' ? 'Location' : formState.location}</div>
                        </div>
                    </div>

                </div>


            </div>
            <form className='border-2 border-black opacity-40 flex flex-col gap-3 h-full w-2/5 justify-center items-center px-6 py-4 rounded' onSubmit={handleSubmit}>

                <input className=' w-full px-4 py-2 text-lg border-2 border-black rounded ' type="email" id="email" name="email" placeholder="Email" value={formState.email} onChange={handleInputChange} />
                <label >@handle or emial</label>
                <input className=' w-full px-4 py-2 text-lg border-2 border-black rounded ' type="text" id="title" name="title" placeholder="Title" value={formState.title} onChange={handleInputChange} />


                <input className=' w-full px-4 py-2 text-lg border-2 border-black rounded ' type="text" id="profession" name="profession" placeholder="Profession" value={formState.profession} onChange={handleInputChange} />

                <input className=' w-full px-4 py-2 text-lg border-2 border-black rounded ' type="text" id="budget" name="budget" placeholder="Budget" value={formState.budget} onChange={handleInputChange} />

                <input className=' w-full px-4 py-2 text-lg border-2 border-black rounded ' type="text" id="location" name="location" placeholder="Location" value={formState.location} onChange={handleInputChange} />

                <input className=' w-full px-4 py-2 text-lg border-2 border-black rounded  ' type="date" id="start" name="start" placeholder="Start" value={formState.start} onChange={handleInputChange} />

                <input className=' w-full px-4 py-2 text-lg border-2 border-black rounded  ' type="date" id="end" name="end" placeholder="End" value={formState.end} onChange={handleInputChange} />

                <textarea className=' w-full px-4 py-2 text-lg border-2 border-black rounded '  id="description" name="description" placeholder="Description" value={formState.description} onChange={handleInputChange} />

                <input className=' w-full px-4 py-2 text-lg border-2 border-black rounded ' type="file" accept="image/*" id="img" name="img" placeholder="Image" onChange={handleImageChange} />

                <button className=' w-full px-4 py-2 text-lg border-2 border-black rounded ' type="submit" >Submit</button>
            </form>

        </div>


    );
};

export default MyForm;


