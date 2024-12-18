import ProductImageUpload from '@/components/admin-view/image-upload'
import AdminProductTile from '@/components/admin-view/prouduct-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, editProduct, fetchAllProducts, deleteProduct  } from '@/store/admin/products-slice'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialFormData = {
  image : null,
  title : '',
  description : '',
  category : '',
  brand : '',
  price : "",
  salePrice : '',
  totalStock : '',
  averageReview: 0,
}

const AdminProducts = () => {

  const [openCreateProductsDialog, setopenCreateProductsDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const {productList} = useSelector(state=>state.adminProducts)
  const dispatch = useDispatch()
  const {toast} = useToast()

  const onSubmit = (event)=>{
    event.preventDefault()

    currentEditedId !== null ?
    dispatch(editProduct({
      id : currentEditedId, formData
    })).then((data)=>{
      console.log(data, 'edit');

      if(data?.payload?.success) {
        dispatch(fetchAllProducts())
        setFormData(initialFormData)
        setopenCreateProductsDialog(false)
        setCurrentEditedId(null)
      }
      
    }) :

    dispatch(addNewProduct({
      ...formData,
      image : uploadedImageUrl
    })).then((data)=> {
      if(data?.payload?.success) {
        dispatch(fetchAllProducts())
        setopenCreateProductsDialog(false)
        setImageFile(null),
        setFormData(initialFormData)
        toast({
          title : 'Product added successfully'
        })
      }
    })
  }

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  };
  

  const isFormValid = ()=>{
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  }, [dispatch])

  console.log(formData, "productList");
  

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={()=>setopenCreateProductsDialog(true)}>Add New products</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ? 
          productList.map(productItem=> (
          <AdminProductTile 
            setFormData={setFormData} 
            setopenCreateProductsDialog={setopenCreateProductsDialog} 
            setCurrentEditedId={setCurrentEditedId} 
            product={productItem} 
            handleDelete={handleDelete}
          />
        )) : null
        }
      </div>
        <Sheet open={openCreateProductsDialog} 
        onOpenChange={()=>{
          setopenCreateProductsDialog(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}
        >
          <SheetContent side="right" className='overflow-auto'>
            <SheetHeader>
              <SheetTitle>
                {
                  currentEditedId !== null ?
                  'Edit Product' : 'Add New Product'
                }
              </SheetTitle>
            </SheetHeader>
            <ProductImageUpload 
              imageFile={imageFile} 
              setImageFile={setImageFile} 
              uploadedImageUrl={uploadedImageUrl} 
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState} 
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <div className='py-6'>
              <CommonForm 
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                button={currentEditedId !== null ? 'Edit' : 'Add'}
                formControls={addProductFormElements}
                isBtnDisable={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
    </Fragment>
  )
}

export default AdminProducts