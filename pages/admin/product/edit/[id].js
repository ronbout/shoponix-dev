import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
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
import catchErrors from "../../../../utils/catchErrors";
import baseUrl from "../../../../utils/baseUrl";
import AdminSidebar from "../../../../components/_App/AdminSidebar";
import colors from "../../../../utils/colors.json";
import sizes from "../../../../utils/sizes.json";

const INITIAL_PRODUCT = {
  name: "",
  merchant: {},
  sku: "",
  price: "",
  categoryIds: [],
  tagIds: [],
  mediaUrl: "",
  colorChoices: [],
  sizeChoices: [],
  description: "",
};

const INITIAL_IMAGE = "/images/product-image-placeholder.png";

const AddNewProduct = ({ user, merchants, categories, tags, productInfo }) => {
  console.log("productInfo: ", productInfo);
  const [productDetails, setProductDetails] = useState({
    name: productInfo.name ? productInfo.name : "",
    merchant: productInfo.merchant ? productInfo.merchant : {},
    sku: productInfo.sku ? productInfo.sku : "",
    price: productInfo.price ? productInfo.price : "",
    categoryIds: productInfo.categories ? productInfo.categories : [],
    tagIds: productInfo.tags ? productInfo.tags : [],
    mediaUrl: productInfo.mediaUrl ? productInfo.mediaUrl : INITIAL_IMAGE,
    colorChoices: productInfo.colorChoices ? productInfo.colorChoices : [],
    sizeChoices: productInfo.sizeChoices ? productInfo.sizeChoices : [],
    description: productInfo.description ? productInfo.description : "",
  });
  const [mediaPreview, setMediaPreview] = useState(productDetails.mediaUrl);
  const [success, setSuccess] = useState(false);
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
    setProductDetails((prevState) => ({ ...prevState, [name]: val }));
  };

  const buildMerchantsDropdown = () => {
    const merchantOptions = merchants.map((merchantInfo) => {
      return { value: merchantInfo.id, label: merchantInfo.name };
    });

    return (
      <Select
        value={productDetails.merchant}
        onChange={(val) => handleSelectChange(val, "merchant")}
        name="merchant"
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

  const handleImageChange = (e) => {
    const { files } = e.target;
    setProductDetails((prevState) => ({ ...prevState, mediaUrl: files[0] }));
    const imageUrl = window.URL.createObjectURL(files[0]);
    console.log("imageUrl: ", imageUrl);
    setMediaPreview(imageUrl);
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", productDetails.mediaUrl);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CLOUDINARY_URL,
      data
    );
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      /****
       *
       * turn off cloudinary for testing...keep the usage down!
       */
      // const imageUrl = await handleImageUpload();
      // console.log(imageUrl)
      // const mediaUrl = imageUrl.replace(/^http:\/\//i, "https://");
      const mediaUrl =
        "https://res.cloudinary.com/dhrcafda6/image/upload/v1670786455/tj3hykmremiz5lewxzex.webp";
      const payload = { ...productDetails };
      payload.categoryIds = productDetails.categoryIds.map(
        (cats) => cats.value
      );
      payload.tagIds = productDetails.tagIds.map((tags) => tags.value);
      payload.storeId = productDetails.storeId.value;
      payload.mediaUrl = mediaUrl;
      console.log(payload);
      const url = `${baseUrl}/api/product`;
      const response = await axios.post(url, payload);

      console.log(response.data);
      setLoading(false);
      setProductDetails(INITIAL_PRODUCT);
      setMediaPreview(INITIAL_IMAGE);
      setSuccess(true);
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
            success={success}
            loading={loading}
            onSubmit={handleSubmit}
          >
            <Message error header="Oops!" content={error} />

            <Message
              success
              icon="check"
              header="Success!"
              content="Your product has been submitted"
            />
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
                      onChange={handleImageChange}
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
  const { id: productId } = ctx.query;
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

  const productUrl = `${baseUrl}/api/product/${productId}`;
  const productResponse = await axios.get(productUrl);

  const productInfo = { ...productResponse.data.product };
  productInfo.categories = productInfo.productCategories.map((cat) => {
    return { value: cat.category.id, label: cat.category.name };
  });
  productInfo.tags = productInfo.productTags.map((tag) => {
    return { value: tag.tag.id, label: tag.tag.name };
  });
  productInfo.merchant = {
    value: productInfo.store.id,
    label: productInfo.store.name,
  };

  return {
    ...merchantResponse.data,
    ...categoryResponse.data,
    ...tagResponse.data,
    productInfo,
  };
  // note: this object will be merge with existing props
};

export default AddNewProduct;
