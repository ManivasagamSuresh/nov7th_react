import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { config } from './config';

function Products() {
    const [productList, setProductList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [productId, setProductID] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const products = await axios.get(`${config.api}/products`,{
            headers:{
                "Authorization":localStorage.getItem("myreact")
            }
          });
          setProductList(products.data);
        } catch (error) {
          alert("error");
        }
      };
      fetchData();
    }, []);
    const formik = useFormik({
      initialValues: {
        name: "",
        price: "",
      },
      onSubmit: async (values) => {
        try {
          if (isEdit==false) {
            let products = await axios.post(
              `${config.api}/create-product`,
              values,{
                headers:{
                    "Authorization":localStorage.getItem("myreact")
                }
              });
            setProductList([
              ...productList,
              { ...values, _id: products.data._id },
            ]); 
            formik.resetForm();
          } else {

            await axios.put(`${config.api}/product/${productId}`, values);
            const pIndex = productList.findIndex((p) => p._id == productId);
            productList[pIndex] = values;
            setProductList([...productList]);
            setIsEdit(false);
            formik.resetForm();
          }
        } catch (error) {
          console.log("error")
          alert(error);
  
        }
      },
    });
  
    const deleteProduct = async (id) => {
      try {
        await axios.delete(`${config.api}/product/${id}`);
        const pIndex = productList.findIndex((p) => p._id == id);
        productList.splice(pIndex, 1);
        setProductList([...productList]);
      } catch (error) {
        alert("something went wrong");
      }
    };
  
    const editproduct = async (id) => {
      try {
        let product = await axios.get(`${config.api}/product/${id}`);
  
        formik.setValues(product.data);
        setIsEdit(true);
  
        setProductID(id);
      
      } catch (error) {
        alert("error");
      }
    };
  return (
    <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label>Name</label>
              <input
                type= {"text"}
                className="form-control"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Price</label>
              <input
                type={"text"}
                className="form-control"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-lg-4 mt-2">
              <input
                type={"submit"}
                value={isEdit ? "edit" : "submit"}
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="col-lg-6">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
            productList.map((prod) => {
              return (
                <tr>
                  <th scope="row">{prod._id}</th>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        deleteProduct(prod._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        editproduct(prod._id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  )
}

export default Products;