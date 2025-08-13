import { Gem, Sparkles } from "lucide-react"
import axios from 'axios'
import toast from 'react-hot-toast'
import {Protect, useAuth } from "@clerk/clerk-react"
import {dummyCreationData} from '../assets/assets'
import { useEffect, useState } from "react"
import CreationItem from '../components/CreationItem'


function Dashboard() {

  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false); //make this true when backend

  const getDashboardData = () => {
    setCreations(dummyCreationData);
  }

  useEffect(() => {
    getDashboardData();
  }, [])


  return (
    <div className="h-full overflow-y-scroll p-6">
        <div className="flex justify-start gap-4 flex-wrap">

            <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
                <div className="text-slate-600">
                    <p className="text-sm">Total Creations</p>
                    <h2 className="text-lg font-semibold">{creations.length}</h2>
                </div>

                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7]
                 text-white flex justify-center items-center">
                    <Sparkles className="w-5 text-white" />
                </div>
            </div>

            <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
                <div className="text-slate-600">
                    <p className="text-sm">Active Plan</p>
                    <h2 className="text-lg font-semibold">
                        <Protect plan={"pro"} fallback={"Free"}>
                            Pro
                        </Protect>{" "}
                    </h2>
                </div>

                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE]
                text-white flex justify-center items-center">
                    <Gem className="w-5 text-white" />
                </div>
            </div>

        </div>

        {!loading ? (
            <div className="space-y-3">
                <p className="mt-6 mb-4">Recent Creation</p>
                {creations.map((item, index) => (
                    <CreationItem key={index} item={item} />
                ))}
            </div>
        ) : (
            <div className="flex justify-center items-center  h-full">
                <span className="w-10 h-10 my-1 rounded-full border-3
                 border-primary border-t-transparent animate-spin"></span>
            </div>
        )}
    </div>
  )
}

export default Dashboard
