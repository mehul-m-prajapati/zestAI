import { Hash, Scissors, Sparkles, Upload } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('');
  const [object, setObject] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

        setLoading(true);

        if (object.split('/[\s,]+/').length > 1) {
            return toast('Please enter only one object name');
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('object', object);

        const resp = await axios.post('/api/ai/remove-image-object', formData, {
            headers: { Authorization: `Bearer ${await getToken()}` }
        });

        if (resp.status === 200) {
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
      <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4">

        {/* Left column */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#8E37EB]" />
            <h1 className="text-xl font-semibold">Object Removal</h1>
          </div>

          <p className="mt-6 text-sm font-medium">Upload image</p>

          <div className="relative mt-2">
            <Upload className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="image/*"
                className="pl-10 cursor-pointer pr-3 py-2 outline-none text-sm
                 rounded-md border border-gray-300 text-gray-600"
                required
            />
          </div>

          <p className="mt-6 text-sm font-medium">Describe object to remove</p>

          <textarea
            onChange={(e) => setObject(e.target.value)}
            value={object}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
            placeholder="e.g., tree, car, chair"
            required
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full sm:w-[40%] flex justify-center items-center gap-2
            bg-gradient-to-r from-[#8E37EB] to-[#8E37EB]
             text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Scissors className="w-5" />
            )}
            Remove Object
          </button>
        </form>

        {/* Right column */}
        <div className="w-full max-w-2xl p-4 rounded-lg flex flex-col border border-gray-200 min-h-96">
          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-[#8E37EB]" />
            <h1 className="text-xl font-semibold">Processed Image</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Scissors className="w-9 h-9" />
                <p>Upload an image and describe what to remove</p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full">
              <img src={content} alt="Processed" className="mt-3 w-full h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject
