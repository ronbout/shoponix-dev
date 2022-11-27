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
import baseUrl from '../../utils/baseUrl';
import catchErrors from '../../utils/catchErrors';
import CustomSidebar from '../../components/_App/CustomerSidebar';

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

const INITIAL_PRODUCT = {
    name: "",
    price: "",
    productType: "",
    media: "",
    description: ""
};

const AddProduct = ({ user, store }) => {
    const [product, setProduct] = React.useState(INITIAL_PRODUCT);

    const [mediaPreview, setMediaPreview] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        const isProduct = Object.values(product).every(el => Boolean(el));
        isProduct ? setDisabled(false) : setDisabled(true);
    }, [product]);

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
            const { name, price, description, productType } = product;
            const payload = {
                name, price, description,
                productType, mediaUrl,
                userId: user._id, storeId: store._id
            };
            const response = await axios.post(url, payload);
            // console.log(response)
            setLoading(false);
            // console.log({response})
            setProduct(INITIAL_PRODUCT);
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
                    <Icon name="add" color="orange" />
                    Create a New Product
                </Header>
                <Message
                    attached
                    icon='cart plus'
                    color='olive'
                    header={`Store: ${store.name}`}
                />
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
                    <Image src={mediaPreview} rounded centered size="small" />
                    <Form.Field
                        control={TextArea}
                        name="description"
                        label="Description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChanhe} 
                        rows="5"
                    />
                    <Form.Field
                        control={Button}
                        disabled={disabled || loading}
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

export default AddProduct;
