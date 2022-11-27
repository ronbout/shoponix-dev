import React from 'react'
import { Tab, Table, Icon, Button, Form } from 'semantic-ui-react'

const ProductDetailsTab = ({description}) => {
    return (
        <Tab panes={[
            { 
                menuItem: 'Description', render: () => 
                <Tab.Pane>
                    <div className="products-details-tab-content">
                        <p>
                            {description}
                        </p> 
        
                    </div>
                </Tab.Pane> 
            },
            { 
                menuItem: 'Additional Information', render: () => 
                <Tab.Pane>
                    <div className="products-details-tab-content">
                        <Table singleLine>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Color:</Table.Cell>
                                    <Table.Cell>Blue, Purple, White</Table.Cell>
                                </Table.Row>
        
                                <Table.Row>
                                    <Table.Cell>Size:</Table.Cell>
                                    <Table.Cell>20, 24</Table.Cell>
                                </Table.Row>
        
                                <Table.Row>
                                    <Table.Cell>Material:</Table.Cell>
                                    <Table.Cell>100% Polyester</Table.Cell>
                                </Table.Row>
        
                                <Table.Row>
                                    <Table.Cell>Height:</Table.Cell>
                                    <Table.Cell>180 cm - 5' 11”</Table.Cell>
                                </Table.Row>
        
                                <Table.Row>
                                    <Table.Cell>Bust:</Table.Cell>
                                    <Table.Cell>83 cm - 32”</Table.Cell>
                                </Table.Row>
        
                                <Table.Row>
                                    <Table.Cell>Waist:</Table.Cell>
                                    <Table.Cell>57 cm - 22”</Table.Cell>
                                </Table.Row>
        
                                <Table.Row>
                                    <Table.Cell>Hips:</Table.Cell>
                                    <Table.Cell>88 cm - 35</Table.Cell>
                                </Table.Row>
        
                                <Table.Row>
                                    <Table.Cell>Shipping:</Table.Cell>
                                    <Table.Cell>Free</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </Tab.Pane> 
            },
            { 
                menuItem: ' Shipping', render: () => 
                <Tab.Pane>
                    <div className="products-details-tab-content">
                        <Table singleLine>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Shipping</Table.Cell>
                                    <Table.Cell>This item Ship to USA</Table.Cell>
                                </Table.Row>
                                
                                <Table.Row>
                                    <Table.Cell>Delivery</Table.Cell>
                                    <Table.Cell>Monday, June 7, 2020</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </Tab.Pane> 
            },
            { 
                menuItem: 'Why Buy From Us', render: () => 
                <Tab.Pane>
        
                    <div className="products-details-tab-content">
                        <p>Here are 5 more great reasons to buy from us:</p>
                        <ul>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
                            <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
                            <li>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            <li>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</li>
                        </ul>
                    </div>
                </Tab.Pane> 
            },
            { 
                menuItem: 'Reviews', render: () => 
                <Tab.Pane>
                    <div className="products-details-tab-content">
                        <div className="products-review-form">
                            <h3>Customer Reviews</h3>
                            <div className="review-title">
                                <div className="rating">
                                    <Icon name='star' />
                                    <Icon name='star' />
                                    <Icon name='star' />
                                    <Icon name='star' />
                                    <Icon name='star' />
                                </div>
                                <p>Based on 3 reviews</p>
        
                                <a className="default-btn" href="#">Write a Review</a>
                            </div>
        
                            <div className="review-comments">
                                <div className="review-item">
                                    <div className="rating">
                                        <Icon name='star' />
                                        <Icon name='star' />
                                        <Icon name='star' />
                                        <Icon name='star' />
                                        <Icon name='star' />
                                    </div>
                                    <h3>Good</h3>
                                    <span><strong>Admin</strong> on <strong>Sep 21, 2019</strong></span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                </div>
        
                                <div className="review-item">
                                    <div className="rating">
                                        <Icon name='star' />
                                        <Icon name='star' />
                                        <Icon name='star' />
                                        <Icon name='star' />
                                    </div>
                                    <h3>Good</h3>
                                    <span><strong>Admin</strong> on <strong>Sep 21, 2019</strong></span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                </div>
        
                                <div className="review-item">
                                    <div className="rating">
                                        <Icon name='star' />
                                        <Icon name='star' />
                                        <Icon name='star' />
                                        <Icon name='star' />
                                    </div>
        
                                    <h3>Good</h3>
                                    <span><strong>Admin</strong> on <strong>Sep 21, 2019</strong></span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                </div>
                            </div>
        
                            <div className="review-form">
                                <h3>Write a Review</h3>
                                <Form>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Field>
                                                <input type="text" id="name" name="name" placeholder="Enter your name" className="form-control" />
                                            </Form.Field>
                                        </div>
        
                                        <div className="col-6">
                                            <Form.Field>
                                                <input type="email" id="email" name="email" placeholder="Enter your email" className="form-control" />
                                            </Form.Field>
                                        </div>
                                    </div>
        
                                    <Form.Field>
                                        <input type="text" id="review-title" name="review-title" placeholder="Enter your review a title" className="form-control" />
                                    </Form.Field>
        
                                    <Form.Field>
                                        <textarea name="review-body" id="review-body" rows="6" placeholder="Write your comments here" className="form-control" />
                                    </Form.Field>
         
                                    <Button type='submit' className="default-btn">Submit Review</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Tab.Pane> 
            },
        ]} className="products-details-tab" />
    );
}

export default ProductDetailsTab
