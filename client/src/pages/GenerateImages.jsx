import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const ImageStyle = [
    'Realistic', 'Ghibli style', 'Anime style', 'Cartoon style',
    'Fantasy style', 'Realistic style', '3D style', 'Portrait style'
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

        const resp = await axios.post('/api/ai/generate-image', {prompt, publish}, {
            headers: { Authorization: `Bearer ${await getToken()}` }
        })

        if (resp.status === 200) {
            // content is secure_url of cloudinary image
            setContent(resp.data.content);
        }
        else {
            toast.error(resp.message);
        }
    }
    catch (error) {
        toast.error(error.message);
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4'>

        {/* left column */}
        <form
          onSubmit={onSubmitHandler}
          className='w-full max-w-lg p-4 rounded-lg border border-gray-200'
        >
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#00AD25]' />
            <h1 className='text-xl font-semibold'>AI Image Generator</h1>
          </div>

          <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            placeholder='Describe what you want to see in the image...'
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
            required
          />

          <p className='mt-4 text-sm font-medium'>Style</p>
          <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
            {ImageStyle.map((item) => (
              <span
                onClick={() => setSelectedStyle(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                  selectedStyle === item
                    ? 'bg-green-50 text-green-700'
                    : ' border-gray-300'
                }`}
                key={item}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="my-6 flex items-center gap-2">
            <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                id="publishCheckbox"
                className="w-4 h-4 accent-green-800"
            />
            <label htmlFor="publishCheckbox" className="text-sm cursor-pointer">
                Make this image Public
            </label>
          </div>

          <button
            disabled={loading}
            className='w-full sm:w-[40%] flex justify-center items-center gap-2
             bg-gradient-to-r from-[#00AD25] to-[#00AD25]
             text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
          >
            {loading ? (
              <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            ) : (
              <Image className='w-5' />
            )}
            Generate Image
          </button>
        </form>

        {/* right column */}
        <div className='w-full max-w-lg p-4 rounded-lg flex flex-col border border-gray-200 min-h-96'>
          <div className='flex items-center gap-3'>
            <Image className='w-5 h-5 text-[#00AD25]' />
            <h1 className='text-xl font-semibold'>Generated Images</h1>
          </div>

          {!content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Image className='w-9 h-9' />
                <p>Describe an image and click "Generated Image" to get started</p>
              </div>
            </div>
          ) : (
            <div className='mt-3 h-full'>
              <img src={content} alt='image' className='w-full h-full' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateImages
