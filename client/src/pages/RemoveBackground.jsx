import { Eraser, Sparkles, Upload, Download } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', input);

        const resp = await axios.post('/api/ai/remove-image-background', formData, {
            headers: { Authorization: `Bearer ${await getToken()}` }
        });

        if (resp.status === 200) {
            setContent(resp.data.content);
        }
        else {
            toast.error(resp.message)
        }
    }
    catch (error) {
        toast.error(error.message)
    }
    finally {
        setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
        const response = await fetch(content, { mode: 'cors' });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'processed-image.png';
        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log('Download failed:', error);
    }
  };

  return (
    <div>
      <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>

        {/* left column */}
        <form
          onSubmit={onSubmitHandler}
          className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'
        >
          <div className='flex items-center gap-3'>
            <Sparkles className='w-6 text-[#FF4938]' />
            <h1 className='text-xl font-semibold'>Background Removal</h1>
          </div>

          <p className='mt-6 text-sm font-medium'>Upload image</p>

          <div className="relative mt-2">
            <Upload className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
                onChange={(e) => setInput(e.target.files[0])}
                type="file"
                accept="image/*"
                className="pl-10 cursor-pointer pr-3 py-2 outline-none text-sm
                 rounded-md border border-gray-300 text-gray-600"
                required
            />
          </div>

          <p className='text-sm italic'>Supports JPG, PNG, and other image formats</p>

          <button
            disabled={loading}
            className='w-full sm:w-[40%] flex justify-center items-center gap-2 bg-gradient-to-r
            from-[#FF4938] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
          >
            {loading ? (
              <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            ) : (
              <Eraser className='w-5' />
            )}
            Remove Background
          </button>
        </form>

        {/* right column */}
        <div className='w-full max-w-2xl p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
          <div className='flex items-center gap-3'>
            <Eraser className='w-5 h-5 text-[#FF4938]' />
            <h1 className='text-xl font-semibold'>Processed Image</h1>
          </div>

          {content && (
            <button
                onClick={handleDownload}
                className="flex items-center gap-1 bg-[#FF4938] text-white px-3 py-1
                rounded-md hover:bg-[#e03e30] transition w-[20%] mt-3 cursor-pointer"
                aria-label="Download image"
            >
            <Download className="w-4 h-4" />
                Download
            </button>
          )}

          {!content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Eraser className='w-9 h-9' />
                <p>Upload an image and click "Remove Background" to get started</p>
              </div>
            </div>
          ) : (
            <div className='mt-3 h-full'>
              <img src={content} alt='image' className='w-full max-h-[500px] h-auto object-contain rounded-md shadow-sm' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground
