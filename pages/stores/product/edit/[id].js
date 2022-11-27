import React from 'react';
import {
    Form,
    Input,
    TextArea,
    Button,
    Image,
    Message,
    Header,
    Icon,
} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../../../utils/baseUrl';
import catchErrors from '../../../../utils/catchErrors';
import AdminSidebar from '../../../../components/_App/AdminSidebar';
import CustomSidebar from '../../../../components/_App/CustomerSidebar';

const options = [
    { key: 't-shirt', text: 'T-Shirt', value: 't-shirt' },
    { key: 'fashion', text: 'Fashion', value: 'fashion' },
    { key: 'furniture', text: 'Furniture', value: 'furniture' },
    { key: 'jewelry', text: 'Jewelry', value: 'jewelry' },
    { key: 'book-magazine', text: 'Book and Magazine', value: 'book-magazine' },
    { key: 'electronics', text: 'Electronics', value: 'electronics' },
    { key: 'medical', text: 'Medical', value: 'medical' },
    { key: 'home-decor', text: 'Home Decor', value: 'home-decor' },
    { key: 'grocery', text: 'Grocery', value: 'grocery' },
    { key: 'other', text: 'Other', value: 'other' },
]

const Edit = ({ user, getProduct, store }) => {
    // console.log(getProduct)
    const [product, setProduct] = React.useState({
        _id: getProduct._id,
        name: getProduct.name,
        price: getProduct.price,
        productType: getProduct.productType,
        media: getProduct.mediaUrl,
        description: getProduct.description
    });

    const [mediaPreview, setMediaPreview] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    // const [disabled, setDisabled] = React.useState(true);
    const [error, setError] = React.useState();

    const handleChanhe = e => {
        // console.log(d.value)
        const { name, value, files } = e.target;
        if (name === 'media') {
            setProduct(prevState => ({ ...prevState, media: files[0] }))
            setMediaPreview(window.URL.createObjectURL(files[0]));
        } else {
            setProduct(prevState => ({ ...prevState, [name]: value }));
        }
        // console.log(product);
    }

    const handleImageUpload = async () => {
        if (getProduct.mediaUrl === product.media) {
            return product.media;
        }
        const data = new FormData();
        data.append('file', product.media);
        data.append('upload_preset', 'vikings');
        data.append('cloud_name', 'dev-empty');
        const response = await axios.post(process.env.CLOUDINARY_URL, data);
        const mediaUrl = response.data.url;
        return mediaUrl;
    }

    const handleSelectInput = (e, d) => {
        setProduct(prevState => ({ ...prevState, productType: d.value }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(product)
        try {
            setLoading(true);
            setError('');
            const imageUrl = await handleImageUpload();
            // console.log(imageUrl)
            const mediaUrl = imageUrl.replace(/^http:\/\//i, 'https://');
            // console.log(mediaUrl)
            const url = `${baseUrl}/api/product`;
            const { _id, name, price, description, productType } = product;
            const payload = { _id, name, price, description, productType, mediaUrl };
            await axios.put(url, payload);
            setLoading(false);
            // console.log({response})
            setSuccess(true);
        } catch (error) {
            catchErrors(error, setError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CustomSidebar user={user} store={store}>
            <div className="create-new-products-area">
                <Header as="h2" block>
                    <Icon name="edit" color="orange" />
                    Edit This Product ({getProduct.name})
                </Header>

                <Form loading={loading} success={success} error={Boolean(error)} onSubmit={handleSubmit}>
                    <Message
                        error
                        header="Oops!"
                        content={error}
                    />

                    <Message
                        success
                        icon="check"
                        header="Success!"
                        content="Your product has been submitted"
                    />

                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}
                            name="name"
                            label="Name"
                            placeholder="Name"
                            value={product.name}
                            onChange={handleChanhe}
                        />

                        <Form.Field
                            control={Input}
                            name="price"
                            label="Price"
                            placeholder="Price"
                            min="0.00"
                            step="0.01"
                            type="number"
                            value={product.price}
                            onChange={handleChanhe}
                        />

                        <Form.Select
                            name="type"
                            label='Type'
                            options={options}
                            placeholder='Type'
                            onChange={handleSelectInput}
                            defaultValue={product.productType}
                        />
                    </Form.Group>

                    <Form.Field
                        control={Input}
                        name="media"
                        type="file"
                        label="Media"
                        accept="image/*"
                        content="Select Image"
                        onChange={handleChanhe}
                    />

                    <Image src={mediaPreview || getProduct.mediaUrl} rounded centered size="small" />

                    <Form.Field
                        control={TextArea}
                        name="description"
                        label="Description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChanhe}
                        rows="10"
                    />
                    
                    <Form.Field
                        control={Button}
                        disabled={loading}
                        color="green"
                        icon="pencil alternate"
                        content="Submit"
                        type="submit"
                    />
                </Form>
            </div>
        </CustomSidebar>
    );
}

Edit.getInitialProps = async ({ query: { id } }) => {
    // console.log(id)
    const url = `${baseUrl}/api/product`;
    const payload = { params: { id } }
    const response = await axios.get(url, payload);
    return { getProduct: response.data.product }
}

export default Edit;