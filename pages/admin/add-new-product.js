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
  Input,
  Icon,
  Message,
  Segment,
  Container,
} from "semantic-ui-react";
import Select from "react-select";
import catchErrors from "../../utils/catchErrors";
import baseUrl from "../../utils/baseUrl";
import AdminSidebar from "../../components/_App/AdminSidebar";
import colors from "../../utils/colors.json";
import sizes from "../../utils/sizes.json";

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
    mediaUrl: productInfo.mediaUrl ? productInfo.mediaUrl : "",
    colorChoices: productInfo.colorChoices ? productInfo.colorChoices : [],
    sizeChoices: productInfo.sizeChoices ? productInfo.sizeChoices : [],
    description: productInfo.description ? productInfo.description : "",
  });
  const [mediaPreview, setMediaPreview] = useState(
    "/images/product-image-placeholder.png"
  );
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

  const handleSelectChange = (val, name) => {
    console.log(val);
    console.log(name);
    // const { name } = e.target;
    // let values = Array.from(e.target.selectedOptions, (option) => option.value);
    // console.log("values: ", values);
    setProductDetails((prevState) => ({ ...prevState, [name]: val }));
  };

  const buildMerchantsDropdown = () => {
    const merchantOptions = merchants.map((merchantInfo) => {
      return { value: merchantInfo.id, label: merchantInfo.name };
    });

    return (
      <Select
        value={productDetails.storeId}
        onChange={(val) => handleSelectChange(val, "storeId")}
        name="storeId"
        instanceId="merchant-selection"
        placeholder="Select Merchant"
        required={true}
        isSearchable
        options={merchantOptions}
      ></Select>
    );
  };

  const buildCategoriesDropdown = () => {
    const categoryOptions = categories.map((categoryInfo) => {
      return { value: categoryInfo.id, label: categoryInfo.name };
    });

    return (
      <Select
        value={productDetails.categoryIds}
        onChange={(val) => handleSelectChange(val, "categoryIds")}
        name="categoryIds"
        instanceId="category-selection"
        placeholder="Select Categories"
        isMulti
        isSearchable
        options={categoryOptions}
      ></Select>
    );
  };

  const buildTagsDropdown = () => {
    const tagOptions = tags.map((tagInfo) => {
      return { value: tagInfo.id, label: tagInfo.name };
    });

    return (
      <Select
        value={productDetails.tagIds}
        onChange={(val) => handleSelectChange(val, "tagIds")}
        name="tagIds"
        instanceId="tag-selection"
        placeholder="Select Tags"
        isMulti
        options={tagOptions}
      ></Select>
    );
  };

  const buildColorsDropdown = () => {
    const colorOptions = colors.map((colorInfo) => {
      return {
        value: colorInfo.name,
        label: colorInfo.name,
        hex: colorInfo.hex,
      };
    });

    const formatOptionLabel = ({ value, label, hex }) => {
      return (
        <div>
          <span style={{ width: "120px", display: "inline-block" }}>
            {label}
          </span>
          <span
            style={{
              marginLeft: "24px",
              width: "100px",
              height: "25px",
              backgroundColor: hex,
              display: "inline-block",
            }}
          >
            &nbsp;
          </span>
        </div>
      );
    };

    return (
      <Select
        value={productDetails.colorChoices}
        onChange={(val) => handleSelectChange(val, "colorChoices")}
        name="colorChoices"
        instanceId="color-selection"
        placeholder="Select Available Colors"
        isMulti
        options={colorOptions}
        formatOptionLabel={formatOptionLabel}
      ></Select>
    );
  };

  const buildSizesDropdown = () => {
    const sizeOptions = sizes.map((sizeInfo) => {
      return {
        value: sizeInfo.code,
        label: sizeInfo.code,
      };
    });

    return (
      <Select
        value={productDetails.sizeChoices}
        onChange={(val) => handleSelectChange(val, "sizeChoices")}
        name="sizeChoices"
        instanceId="size-selection"
        placeholder="Select Available Sizes"
        isMulti
        options={sizeOptions}
      ></Select>
    );
  };

  const handleImageUpload = (e) => {
    const { files } = e.target;
    setProductDetails((prevState) => ({ ...prevState, mediaUrl: files[0] }));
    const imageUrl = window.URL.createObjectURL(files[0]);
    console.log("imageUrl: ", imageUrl);
    setMediaPreview(imageUrl);
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
        <h3>Add Product</h3>
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
                        name="name"
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
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "50%",
                      height: "600px",
                      paddingRight: "12px",
                    }}
                  >
                    <Form.Field
                      control={Input}
                      name="mediaUrl"
                      type="file"
                      label="Product Image"
                      accept="image/*"
                      content="Select Image"
                      onChange={handleImageUpload}
                    />
                    <Image
                      id="product-image-display"
                      src={mediaPreview}
                      width={569}
                      height={569}
                    />
                  </div>
                  <div
                    style={{
                      width: "50%",
                      paddingRight: "12px",
                      marginTop: "68px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ marginBottom: "24px" }}>
                      <label htmlFor="color-selection">Colors Available</label>
                      {buildColorsDropdown()}
                    </div>
                    <div style={{ marginBottom: "24px" }}>
                      <label htmlFor="size-selection">Sizes Available</label>
                      {buildSizesDropdown()}
                    </div>
                    <div style={{ marginBottom: "24px" }}>
                      <label htmlFor="description">Product Description *</label>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        value={productDetails.description}
                        required={true}
                        onChange={handleChange}
                      />
                    </div>

                    <div style={{ textAlign: "right", marginTop: "24px" }}>
                      <Button
                        type="submit"
                        content="Create"
                        color="blue"
                        disabled={false && (disabled || loading)}
                      />
                    </div>
                  </div>
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
