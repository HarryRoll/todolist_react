import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import ActivityApi from '../Api/ActivityApi'
import { PlusIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'

function Dasboard() {

    const [activityData, setActivityData] = useState('')
    const [refresh, setRefresh] = useState(true)
    const [delModal, setDelModal] = useState(false)
    const [getId, setGetId] = useState('')

    const dated = new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            })

    const add = () => {
        const data = {"title": "New Activity"}

        ActivityApi.newActivity(data).then(e => console.log(e))
        setTimeout(() => {
        setRefresh(!refresh)
        },1500)
    }

    const deleteModal = (id) => {
            setDelModal(true)
            setGetId(id)
        }

    const deleted = () => {
        ActivityApi.deletedActivity(getId)
        setTimeout(() => {
        setGetId(undefined)
        setRefresh(!refresh)
        setDelModal(false)
    },1500)
    }
    
    useEffect( () => {
        ActivityApi.getActivity().then(e => {
            setActivityData(e.data)
        })
    },[refresh])

  return (
    <div className='flex flex-col mx-auto justify-center px-40 mt-8'>
        <div className='flex flex-row mb-16 justify-between px-4 items-center'>
            <h1 className='text-4xl font-black'>Activity</h1>
            <button className='flex flex-row p-3 bg-blue-400 text-white rounded-3xl items-center justify-center w-44 text-xl' onClick={() => add()}>
                <PlusIcon className="h-6 w-6 text-white mr-3"/>
                Tambah
            </button>
        </div>
        <div className='flex flex-wrap px-3 w-full'>
            {activityData && activityData.map( (act , i) => {
                if(i<12){
                    return(
                       
                        <Link to={`/details/${act.id}`} key={i} className='basis-1/4 pr-5 mb-6'>
                            <div className='px-6 py-7 h-56 bg-white rounded-2xl drop-shadow-xl'>
                                <h1 className='text-xl h-32'>{act.title}</h1>
                                
                                <div className='flex flex-row justify-between '>
                                    <p className='font-semibold text-gray-500'>{dated.format(new Date(act.created_at)).toString()}</p>
                                    <TrashIcon onClick={() => deleteModal(act.id)} className='h-6 w-6 md:min-w-min text-gray-400'/>
                                </div>
                            </div>
                        </Link>
                       
                    )
                }
            })}
        </div>
        <>
                  {delModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center mt-2 px-8 pt-8 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    <ExclamationTriangleIcon className='w-24 h-24 text-red-500'/>
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto text-center">
                  <p className="text-slate-500 text-lg leading-relaxed">
                        Apakah anda yakin menghapus activity ini?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-gray-100 text-gray-800 active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mr-6"
                    type="button"
                    onClick={() => {
                        setDelModal(false)
                        setGetId(undefined)}
                    }
                  >
                    Batal
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deleted()}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>



    </div>
  )
}

export default Dasboard
