import React from 'react'
import { useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdMoney, MdPriceChange, MdPriceCheck, MdMonetizationOn } from 'react-icons/md'
import { categories } from './utils/data'
import Loader from './Loader'
import { storage } from '../firebase.config'
import {
   deleteObject,
   getDownloadURL,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import { saveItem } from './utils/firebaseFunction'



function CreateConainer() {

   const [title, setTitle] = useState("");
   const [calories, setCalories] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState(null);
   const [imageAsset, setImageAsset] = useState(null);
   const [fields, setFields] = useState(false);
   const [alertStatus, setAlertStatus] = useState("danger");
   const [msg, setMsg] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [{ foodItems }, dispatch] = useStateValue();

   const handlePreviewImage = (e) => {
      setIsLoading(true);
      const imageFile = e.target.files[0];
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);


      uploadTask.on(
         "state_changed",
         (snapshot) => {
            const uploadProgress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         },
         (error) => {
            console.log(error);
            setFields(true);
            setMsg("Error while uploading : Try AGain 🙇");
            setAlertStatus("danger");
            setTimeout(() => {
               setFields(false);
               setIsLoading(false);
            }, 4000);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setImageAsset(downloadURL);
               setIsLoading(false);
               setFields(true);
               setMsg("Image uploaded successfully 😊");
               setAlertStatus("success");
               setTimeout(() => {
                  setFields(false);
               }, 4000);
            });
         }
      );
   }

   const deleteImage = () => {
      setIsLoading(true);
      const deleteRef = ref(storage, imageAsset);
      deleteObject(deleteRef).then(() => {
         setImageAsset(null);
         setIsLoading(false);
         setFields(true);
         setMsg("Image deleted successfully 😊");
         setAlertStatus("success");
         setTimeout(() => {
            setFields(false);
         }, 4000);
      });
   };

   const saveDetails = () => {
      setIsLoading(true)

      try {
         if ((!calories || !title || !price || !category || !imageAsset)) {
            
            console.log(calories,title,price,category,imageAsset)
            setFields(true);
            setMsg("Required fiels are required🙇");
            setAlertStatus("danger");
            setTimeout(() => {
               setFields(false);
               setIsLoading(false);
            }, 4000);
         }
         else {
            const data = {
               id: `${Date.now()}`,
               title: title,
               imageURL: imageAsset,
               category: category,
               calories: calories,
               qty: 1,
               price: price,
            }
            saveItem(data)
            setIsLoading(false);
            setFields(true);
            setMsg("Data uploaded successfully 😊");
            clearData()
            setAlertStatus("success");
            setTimeout(() => {
               setFields(false);

            }, 4000);
         }

      }
      catch (error) {
         console.log(error);
         setFields(true);
         setMsg("Error while uploading : Try AGain 🙇");
         setAlertStatus("danger");
         setTimeout(() => {
            setFields(false);
            setIsLoading(false);
         }, 4000);
      }
   }

   const clearData = () => {
      setTitle('')
      setCalories('')
      setPrice('')
      setCategory(null)
      setImageAsset(null)
   }

   return (

      <div className='w-full min-h-screen flex justify-center items-center'>
         <div className='w-[90%] md:w-[70%] border-gray-300 border flex justify-center rounded-xl p-4 items-center flex-col gap-4' >
            {fields && (
               <div className={`w-full bg-red-400 text-red-800 text-center p-2 rounded-xl 
               ${alertStatus === 'danger' ? "bg-red-400 text-red-800" : "bg-emerald-400 text-emerald-800"}`}>
                  {msg}
               </div>
            )}

            <div className='w-full flex gap-2 border-b border-gray-300 py-2'>
               <MdFastfood className='text-[22px] ' />
               <input
                  type="text"
                  value={title}
                  placeholder="Give me a title..."
                  className="w-48 outline-0 font-semibold bg-transparent text-textColor"
                  onChange={(e) => { setTitle(e.target.value) }}
               >
               </input>
            </div>

            <div className='w-full'>
               <select
                  onChange={(e) => setCategory(e.target.value)}
                  className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
                  <option value="other" className="bg-white">
                  Select Category
                  </option>
                  {categories && categories.map(category => (
                     <option
                        key={category.id}
                        value={category.urlParamName}
                        className="text-base border-0 outline-none capitalize bg-white text-headingColor">
                        {category.name}

                     </option>
                  ))}
               </select>
            </div>
            <div className='group flex justify-center items-center flex-col w-full h-225 md:h-340 border-gray-300
                  border-dotted border-2 rounded-lg cursor-pointer'>
               {isLoading ? (<Loader />
               ) : (
                  <>
                     {!imageAsset ? (
                        <>
                           {/* Sử dụng thay để click toàn bộ khu vực */}
                           <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                              <div className='w-full h-100 flex flex-col items-center justify-center'>
                                 <MdCloudUpload className='text-3xl text-gray-500' />
                                 <p className='text-base text-gray-500 hover:text-gray-900'>
                                    Click here to upload
                                 </p>
                              </div>
                              <input
                                 className='w-0 h-0'
                                 name='uploadImage'
                                 accept='image/*'
                                 type="file"
                                 onChange={handlePreviewImage}
                              />
                           </label>
                        </>
                     ) : (
                        <>
                           {/* View hinh anh */}
                           <div className='w-full h-full relative flex items-center justify-center'>
                              <img
                                 className="w-[80%] h-full object-scale-down"
                                 src={imageAsset}
                                 alt="uploaded image"
                              />
                              <button
                                 className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                 onClick={deleteImage}
                              >
                                 <MdDelete className="text-white" />
                              </button>
                           </div>
                        </>
                     )}
                  </>)}
            </div>

            <div className='w-full py-2  flex flex-col items-center gap-2'>
               <div className='w-full flex justify-center items-center border-b border-gray-300 gap-2'>
                  <MdFoodBank className='text-3xl text-gray-700 ' />
                  <input
                     required
                     value={calories}
                     placeholder="Calories"
                     onChange={(e) => setCalories(e.target.value)}
                     className='w-full h-full text-base outline-none text-gray-500 font-semibold bg-transparent p-2' />
               </div>
               <div className='w-full flex justify-center items-center border-b border-gray-300 gap-2 '>
                  <MdMonetizationOn className='text-3xl text-gray-700 ' />
                  <input
                     required
                     value={price}
                     placeholder="Price"
                     onChange={(e) => setPrice(e.target.value)}
                     className='w-full h-full text-base outline-none text-gray-500 font-semibold bg-transparent p-2' />
               </div>
            </div>
            <div className='w-full flex items-center'>
               <button
                  className='bg-emerald-500 text-lg outline-none w-full rounded-lg py-2 font-semibold text-white'
                  onClick={saveDetails}
               >
                  Save
               </button>
            </div>

         </div>
      </div>
   )
}

export default CreateConainer