import React,{useState, useEffect} from 'react'
import { ChevronLeftIcon, 
        PlusIcon, 
        PencilIcon, 
        ArrowsUpDownIcon,
        BarsArrowUpIcon,
        BarsArrowDownIcon,
        CheckIcon,
        XMarkIcon,
        TrashIcon,
        ExclamationTriangleIcon,
        ExclamationCircleIcon
      } from '@heroicons/react/24/solid'
import ActivityApi from '../Api/ActivityApi'
import ListApi from '../Api/ListApi'
import Select from 'react-select'
import { useParams, Link } from 'react-router-dom'

function ItemList() {

  const [editTitle, setEditTitle] = useState(true)
  const [title, setTitle] = useState('')
  const [refresh, setRefresh] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [activity, setActivity] = useState(undefined)
  const [getId, setGetId] = useState('')
  const [delModal, setDelModal] = useState(false)
  const [values, setValues] = useState(undefined)
  const [ind, setInd] = useState('')
  const [editInp, setEditInp] = useState('')
  const [editSelect, setEditSelect] = useState('')
  const [newInp, setNewInp] = useState('')
  const [newSelect, setNewSelect] = useState('')

  const options = [
  { value: 'very-high', label: 'Very High' },
  { value: 'high', label: 'High' },
  { value: 'normal', label: 'Medium' },
  { value: 'low', label: 'Low' },
  { value: 'very-low', label: 'Very Low' }
]

let {id} = useParams()


  const changeTitle = (e) => {
    const data = {
       id : title.id,
       title : e.target.value
      }
      ActivityApi.editActivity(data)
      setRefresh(!refresh)
  }

  const editListModal = (data) => {
      setValues(data)
      setShowModal(true)
      setInd(options.map(e => e.value).indexOf(data.priority))
  }

  const saveEdit = () => {
    if(!values){
      saveNew()
    }else{
      const data = {
        id : values.id,
        title : editInp,
        priority : editSelect
      }

      ListApi.editListApi(data)
      setTimeout( () => {
        setValues(undefined)
        setShowModal(false)
        setEditInp('')
        setEditSelect('')
        setRefresh(!refresh)
      },1500)
    }
  }

  const saveNew = () => {
    const data ={
      activity_group_id: id,
      title: newInp,
      is_active: 1,
      priority: newSelect 
    }
    ListApi.createListApi(data)
      setTimeout( () => {
        setShowModal(false)
        setNewInp('')
        setNewSelect('')
        setRefresh(!refresh)
      },1500)
  }

  const changeCheck = (a, b) => {
    const data = {
      id : a,
      is_active : b
    }

    ListApi.editListApi(data)
    setTimeout(() => {
        setRefresh(!refresh)
    },100)
  }

  const deleteModal = (id) => {
        setDelModal(true)
        setGetId(id)
  }

  const deleted = () => {
        ListApi.deleteListApi(getId)
        setTimeout(() => {
        setGetId(undefined)
        setRefresh(!refresh)
        setDelModal(false)
    },1500)
  }

useEffect(() => {
    ActivityApi.getOneActivity(id).then(e => {
      setTitle(e)
      setActivity(e.todo_items)
    })
},[refresh])

  return (
    <div className='flex flex-col mx-auto justify-center px-40 mt-8'>
        <div className='flex flex-row mb-20 justify-between px-4 items-center'>
            <div className='flex flex-row items-center'>
                <Link to={'/'}>
                    <h2 className='font-black'><ChevronLeftIcon className='h-9 w-9'/></h2>
                </Link>
                {editTitle ?
                <h1 className='text-3xl font-bold mx-5' onClick={() => setEditTitle(false)}>{title.title}</h1>
                :
                <input className='inputTitle text-3xl w-96 font-bold mx-5 border-b-2 border-gray-800 outline-none' 
                    defaultValue={title.title}
                    onChange={(e) => changeTitle(e)}
                    />          
                }
                <h2><PencilIcon onClick={() => setEditTitle(!editTitle)} className='h-4 w-4 text-gray-400'/></h2>
            </div>
            <div className='flex flex-row items-center'>
              <div className='border rounded-full border-gray-300 mr-5 p-2'>
                  <ArrowsUpDownIcon onClick={() => setShowDropDown(!showDropDown)} className='h-8 w-8 text-gray-500'/>
                  {showDropDown ?
                    <div className='flex flex-col border border-gray-300 rounded-md absolute bg-white z-10'>
                        <div className=' flex flex-row items-center border-b border-gray-300 px-3 py-1 justify-between'>
                            <h3 className='mr-3'><BarsArrowDownIcon className='h-5 w-5 text-blue-500'/></h3>
                            <h3>Terbaru</h3>
                            <h3><CheckIcon className='h-5 w-5 text-gray-500'/></h3>
                        </div>
                        <div className='flex flex-row items-center border-b border-gray-300 px-3 py-1 justify-between'>
                            <h3 className='mr-3'><BarsArrowUpIcon className='h-5 w-5 text-blue-500'/></h3>
                            <h3>Terlama</h3>
                            <h3><CheckIcon className='h-5 w-5 text-gray-500'/></h3>
                        </div>
                        <div className='flex flex-row items-center border-b border-gray-300 px-3 py-1 justify-between'>                          
                            <svg className='w-5 h-5 mr-3 fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm240-64H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 446.37V464a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 321.63V304a16 16 0 0 0-16-16zm31.06-85.38l-59.27-160A16 16 0 0 0 372.72 32h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 224h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 224H432a16 16 0 0 0 15.06-21.38zM335.61 144L352 96l16.39 48z"/>
                            </svg>
                            <h3>A-Z</h3>
                            <h3><CheckIcon className='h-5 w-5 text-gray-500'/></h3>
                        </div>
                        <div className='flex flex-row items-center border-b border-gray-300 px-3 py-1 justify-between'>        
                            <svg className='w-5 h-5 mr-3 fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.78 160 16 160zm272 64h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 65.63V48a16 16 0 0 0-16-16H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 190.37V208a16 16 0 0 0 16 16zm159.06 234.62l-59.27-160A16 16 0 0 0 372.72 288h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 480h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 480H432a16 16 0 0 0 15.06-21.38zM335.61 400L352 352l16.39 48z"/>
                            </svg>                  
                            <h3>Z-A</h3>
                            <h3><CheckIcon className='h-5 w-5 text-gray-500 justify-end'/></h3>
                        </div>
                        <div className='flex flex-row items-center px-3 py-1 justify-between'>
                            <h3 className='mr-3'><ArrowsUpDownIcon className='h-5 w-5 text-blue-500'/></h3>
                            <h3>Belum Selesai</h3>
                            <h3><CheckIcon className='h-5 w-5 text-gray-500 justify-end'/></h3>
                        </div>
                    </div>
                    : <></>
                  }
              </div>
              <button className='flex flex-row p-3 bg-blue-400 text-white rounded-3xl items-center justify-center w-44 text-xl' onClick={() => setShowModal(true)}>
                  <PlusIcon className="h-6 w-6 text-white mr-3"/>
                  Tambah
              </button>
            </div>
        </div>

      {activity ?
        <div>
            {activity && activity.map( e => {
              return(
                <div className='flex flex-row p-6 w-full bg-white mb-3 rounded-xl justify-between'>
                    <div className='flex flex-row items-center'>

                        {e.is_active == 0 ?
                        <input type='checkbox' defaultValue={0} 
                         onClick={() => {
                              changeCheck(e.id, 1)
                            }}
                         className='mr-3' checked/>
                        :
                        <input type='checkbox' defaultValue={1} 
                            onClick={() => {
                              changeCheck(e.id, 0)
                            }}
                        className='mr-3'/>
                        }
                        <h1 className={`mr-3 
                            ${e.priority =="very-high" ? "text-red-500" : 
                              e.priority =="high" ? "text-orange-300" : 
                              e.priority =="normal" ? "text-green-500" : 
                              e.priority =="low" ? "text-blue-400" : "text-purple-500"}`}><ExclamationCircleIcon className='h-5 w-5'/></h1>
                        <h1 className={`mr-3 ${e.is_active == 0 ? 'completed' : '' }`}>{e.title}</h1>
                        <PencilIcon onClick={() => editListModal(e)} className='h-3 w-3 text-gray-500'/>
                    </div>
                    <TrashIcon onClick={() => deleteModal(e.id)} className='w-5 h-5 text-gray-500'/>
                </div>
              )
            })}
        </div>
        :
        <div className='flex justify-center'>
            <img onClick={() => setShowModal(true)} className='w-96' src='https://ivan-todo-devrank.netlify.app/static/media/empty-item.a0b4b794.png' alt='empty'/>
        </div>
        }

        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Tambah Item List
                  </h3>
                  <h3>
                    <XMarkIcon onClick={() => {
                        setShowModal(false)
                        setValues(undefined)                      
                    }} className='w-8 h-8 text-gray-400'/>
                  </h3>
                </div>
                {/*body*/}
                <div className="flex flex-col relative p-6">
                    <div className='flex flex-col my-3'>
                        <label className='font-bold text-xs mb-3'>Nama Item List</label>
                        {values ?
                        <input className='outline outline-1 outline-gray-400 rounded-md p-3 w-full' 
                              placeholder='Tambahkan Nama Activity'
                              defaultValue={values.title}
                              onChange={(e) => setEditInp(e.target.value)}
                              />  
                          :
                        <input className='outline outline-1 outline-gray-400 rounded-md p-3 w-full' 
                        placeholder='Tambahkan Nama Activity'
                        onChange={(e) => setNewInp(e.target.value)}
                        />
                        }
                    </div>
                    <div className='flex flex-col my-3'>
                      <label className='font-bold text-xs mb-3'>Priority</label>
                      {values ? 
                        <Select className='w-1/4 h-3' 
                          options={options}
                          defaultValue={options[ind]}
                          onChange={(e) => {setEditSelect(e.value)}}
                        />
                      :
                        <Select className='w-1/4' 
                        options={options}
                        defaultValue={options[0]}
                        onChange={(e) => {setNewSelect(e.value)}}
                        />
                    }
                    </div>  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      saveEdit()
                    }}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

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
                        Apakah anda yakin menghapus item ini?
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

export default ItemList
