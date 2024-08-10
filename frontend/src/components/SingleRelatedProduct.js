import {Link} from 'react-router-dom';
import { CartContext } from '../Context';
import { useContext,useState, useEffect,  } from 'react';
import { UserContext } from '../Context';
import axios from 'axios';

function SingleRelatedProduct(props){
    const url = 'http://127.0.0.1:8000/api';
    const { cartData, setCartData } = useContext(CartContext);
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
    const [ProductInWishlist, setProductInWishlist] = useState(false);
    const userContext = useContext(UserContext);
    const productData= props.product;
    const product_id=props.product.id;

    const imgStyle = {
        width: '100%',
        height: '15vw',
        objectFit: 'contain',
      };

      useEffect(() => {
        if (props.product) {
            checkProductInCart(props.product.id);
            checkProductInWishList(url + '/check-in-wishlist/', product_id);
        }
    }, [props.product]);

    function checkProductInCart(product_id){
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        if (cartJson!=null){
            cartJson.map((cart)=>{
                if(cart!=null && cart.product.id == product_id){
                    setcartButtonClickStatus(true);
                }
            });
        }
        
    };

    
    const cartAddButtonHandler = () => {
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        var cartData={
                'product':{
                    'id':productData.id,
                    'title':productData.title,
                    'price':productData.price,
                    'image':productData.image,
                },
                'user':{
                    'id':1
                }
        }
        
        if(cartJson!=null){
            cartJson.push(cartData);
            var cartString=JSON.stringify(cartJson);
            localStorage.setItem('cartData',cartString);
            setCartData(cartJson);
        }else{
            var newCartList=[];
            newCartList.push(cartData);
            var cartString=JSON.stringify(newCartList);
            localStorage.setItem('cartData',cartString);
        }
        
        setcartButtonClickStatus(true);
    };


    const cartRemoveButtonHandler = () => {
        
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        cartJson.map((cart,index)=>{
            if(cart!=null && cart.product.id == productData.id){
                cartJson.splice(index,1);
            }
        });
        var cartString=JSON.stringify(cartJson);
        localStorage.setItem('cartData',cartString);
        setcartButtonClickStatus(false);
        setCartData(cartJson);
    };

    // wishlist
    function saveInWishList(){
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData();
        formData.append("customer", customerId);
        formData.append("product", productData.id);

        axios.post(url + '/wishlist/', formData)
            .then(function (response) {
               if(response.data.id){
                setProductInWishlist(true);
               }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //check in wishlist
    function checkProductInWishList(baseUrl,product_id) {
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData();
        formData.append("customer", customerId);
        formData.append("product", product_id);

        axios.post(baseUrl, formData)
            .then(function (response) {
               if(response.data.bool==true){
                    setProductInWishlist(true);
               }else{
                setProductInWishlist(false);
               }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
            <section className="mx-auto my-5" style={{ maxWidth: '20rem' }}>
                <div className="card">
                    <div className="bg-image hover-overlay ripple rounded-1" data-mdb-ripple-color="light">
                        <Link to={'/product/' + props.product.title + '/' + props.product.id}>
                            <img className="img-fluid" src={props.product.image} style={imgStyle} alt="Card image cap" />
                        </Link>
                        <a href="#!">
                            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                        </a>
                    </div>
                    <div className="card-body">
                        <div>
                            <h5 className="card-title font-weight-bold mb-2">
                                <Link to={'/product/' + props.product.title + '/' + props.product.id}>
                                    {props.product.title}
                                </Link>
                            </h5>
                            <p className="card-text">&#8377; {props.product.price}</p>
                        </div>
                        <div className="d-flex justify-content-end align-items-center">
                            <div>
                                <span>
                                {!cartButtonClickStatus &&
                                   <button title="Add to Cart" type="button" onClick={cartAddButtonHandler} className='btn btn-success btn-sm'>
                                   <i className="fa-solid fa-cart-plus"></i> 
                               </button>
                          
                                }
                                
                                { cartButtonClickStatus &&
                                    <button title="Remove form Cart" type="button" onClick={cartRemoveButtonHandler} className='btn btn-warning btn-sm'>
                                        <i className="fa-solid fa-cart-plus"></i> 
                                    </button>
                                }
                                </span>
                               
                                {
                                    (userContext && !ProductInWishlist) && <button title="Add to Wishlist" onClick={saveInWishList} className='btn btn-danger ms-1 btn-sm'><i
                                    className="fa fa-heart"></i> </button>
                                }
                                {
                                    userContext==null && <button title="Add to Wishlist" className='btn btn-danger ms-1 btn-sm disabled'><i
                                    className="fa fa-heart"></i> </button>
                                }
                                {
                                    (userContext && ProductInWishlist) && <button title="Add to Wishlist" className='btn btn-danger ms-1 btn-sm disabled'><i
                                    className="fa fa-heart"></i> </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default SingleRelatedProduct;
