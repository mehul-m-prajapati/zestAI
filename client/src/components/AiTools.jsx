import { AiToolsData } from "../assets/assets"
import { useNavigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"


function AiTools() {

  const navigate = useNavigate();
  const {user} = useUser();

  return (
    <div className='px-4 sm-px-20 xl:px-32'>
        <div className='text-center'>
            <h2 className='text-slate-700 dark:text-gray-100 text-4xl font-semibold'>
                Poweful AI Tools
            </h2>
            <p className='text-gray-500 dark:text-gray-300 max-w-lg mx-auto mt-2'>Everything you need to create, engance, and optimize
                your content with cutting-edge AI technology.
            </p>
        </div>
        <div className="flex flex-wrap mt-10 justify-center">
            {
                AiToolsData.map((tool, index) => (
                <div key={index} className='p-8 m-4 max-w-xs rounded-lg shadow-lg border
                border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
                onClick={()=>user && navigate(tool.path)}>
                    <tool.Icon className='w-12 h-12 p-3 text-white rounded-xl'
                    style={{background:`linear-gradient(to bottom,${tool.bg.from},${tool.bg.to})`}} />
                    <h3 className='mt-6 mb-3 text-lg font-semibold'>{tool.title}</h3>
                    <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>
                </div>))
            }
        </div>
    </div>
  )
}

export default AiTools
