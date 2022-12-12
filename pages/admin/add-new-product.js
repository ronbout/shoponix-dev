import { useState, useEffect } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";
import {
  Button,
  Dropdown,
  Form,
  Icon,
  Message,
  Segment,
  Container,
} from "semantic-ui-react";
import catchErrors from "../../utils/catchErrors";
import baseUrl from "../../utils/baseUrl";
import AdminSidebar from "../../components/_App/AdminSidebar";

const AddNewProduct = ({ user, merchants, categories, tags }) => {
  const router = useRouter();
  const productInfo = {};
  const [productDetails, setProductDetails] = useState({
    name: productInfo.name ? productInfo.name : "",
    storeId: productInfo.storeId ? productInfo.storeId : "",
    sku: productInfo.sku ? productInfo.sku : "",
    price: productInfo.price ? productInfo.price : "",
    categoryIds: productInfo.categoryIds ? productInfo.categoryIds : [],
    tagIds: productInfo.tagIds ? productInfo.tagIds : [],
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isproductDetails = Object.values(productDetails).every((el) =>
      Boolean(el)
    );
    isproductDetails ? setDisabled(false) : setDisabled(true);
  }, [productDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const buildMerchantsDropdown = () => {
    const merchantOptions = merchants.map((merchantInfo) => {
      return (
        <option value={merchantInfo.id} key={merchantInfo.id}>
          {merchantInfo.name}
        </option>
      );
    });

    return (
      <select
        value={productDetails.storeId}
        onChange={handleChange}
        name="storeId"
        id="merchant-selection"
        required={true}
      >
        <option value="" disabled>
          Select Merchant
        </option>
        {merchantOptions}
      </select>
    );
  };

  const buildCategoriesDropdown = () => {
    const categoryOptions = categories.map((categoryInfo) => {
      return (
        <option value={categoryInfo.id} key={categoryInfo.id}>
          {categoryInfo.name}
        </option>
      );
    });

    return (
      <select
        value={productDetails.categoryIds}
        onChange={handleChange}
        name="categoryIds"
        id="category-selection"
        multiple={true}
      >
        <option value="" disabled>
          Select Category(s)
        </option>
        {categoryOptions}
      </select>
    );
  };

  const buildTagsDropdown = () => {
    const tagOptions = tags.map((tagInfo) => {
      return (
        <option value={tagInfo.id} key={tagInfo.id}>
          {tagInfo.name}
        </option>
      );
    });

    return (
      <select
        value={productDetails.tagIds}
        onChange={handleChange}
        name="tagIds"
        id="tag-selection"
        multiple={true}
      >
        <option value="" disabled>
          Select Tag(s)
        </option>
        {tagOptions}
      </select>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // const url = `${baseUrl}/api/parent/${parentId}`;
      // const payload = { ...productDetails };
      // const response = await axios.put(url, payload);

      alert("save routine here");
      // console.log(response.data);
      // const clubname = response.data.parentInfo.club.clubname;
      // Router.push(`/club/${clubname}`);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminSidebar user={user}>
      <Container className="product-entry-container">
        <div>
          <Form
            error={Boolean(error)}
            loading={loading}
            onSubmit={handleSubmit}
          >
            <Message error header="Oops!" content={error} />
            <Segment>
              <section>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", marginBottom: "16px" }}>
                    <div style={{ width: "50%", paddingRight: "12px" }}>
                      <label htmlFor="product-name">Product Name *</label>
                      <input
                        type="text"
                        name="birthday"
                        id="product-name"
                        value={productDetails.name}
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                    <div style={{ width: "50%", paddingRight: "12px" }}>
                      <label htmlFor="merchant-selection">Merchant *</label>
                      {buildMerchantsDropdown()}
                    </div>
                  </div>
                  <div style={{ display: "flex", marginBottom: "16px" }}>
                    <div style={{ width: "50%", paddingRight: "12px" }}>
                      <label htmlFor="sku">SKU *</label>
                      <input
                        type="text"
                        name="sku"
                        id="sku"
                        value={productDetails.sku}
                        onChange={handleChange}
                        required={true}
                      />
                    </div>
                    <div style={{ width: "50%", paddingRight: "12px" }}>
                      <label htmlFor="price">Price *</label>
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        name="price"
                        id="price"
                        value={productDetails.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", marginBottom: "16px" }}>
                    <div style={{ width: "50%", paddingRight: "12px" }}>
                      <label htmlFor="category-selection">
                        Product Category(s)
                      </label>
                      {buildCategoriesDropdown()}
                    </div>
                    <div style={{ width: "50%", paddingRight: "12px" }}>
                      <label htmlFor="tag-selection">Tags</label>
                      {buildTagsDropdown()}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right", marginTop: "24px" }}>
                  <Button
                    type="submit"
                    content="Update"
                    color="blue"
                    disabled={false && (disabled || loading)}
                  />
                </div>
              </section>
            </Segment>
          </Form>
        </div>
      </Container>
    </AdminSidebar>
  );
};

AddNewProduct.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  /***
   *
   *  TODO:  	if not admin or root redirect to /profile
   *
   */
  // fetch data on server
  const merchantUrl = `${baseUrl}/api/merchant`;
  const merchantResponse = await axios.get(merchantUrl);

  const categoryUrl = `${baseUrl}/api/category`;
  const categoryResponse = await axios.get(categoryUrl);

  const tagUrl = `${baseUrl}/api/tag`;
  const tagResponse = await axios.get(tagUrl);

  return {
    ...merchantResponse.data,
    ...categoryResponse.data,
    ...tagResponse.data,
  };
  // note: this object will be merge with existing props
};

export default AddNewProduct;
