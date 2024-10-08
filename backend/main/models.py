from django.db import models
from  django.contrib.auth.models import User

# vendor model 
class Vendor(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE) 
    mobile = models.PositiveBigIntegerField(unique=True,null=True)
    profile_img=models.ImageField(upload_to='vendor_imgs/',null=True)
    address=models.TextField(null=True)
    

    def __str__(self):
        return self.user.username

#product category 
class ProductCategory(models.Model):
    title=models.CharField(max_length=100)
    detail=models.TextField(null=True)
    cat_img=models.ImageField(upload_to='category_imgs/',null=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural='Product categories'

#product
class Product(models.Model):
    category=models.ForeignKey(ProductCategory, on_delete=models.SET_NULL , null=True ,related_name='category_product')
    vendor=models.ForeignKey(Vendor, on_delete=models.SET_NULL , null=True)
    title=models.CharField(max_length=200)
    slug=models.CharField(max_length=300,unique=True,null=True)
    detail=models.TextField(null=True)
    price=models.FloatField(null=True)
    tags=models.TextField(null=True) 
    image=models.ImageField(upload_to='product_imgs/',null=True) 
    

    def  __str__(self):
        return self.title

    def tag_list(self):
        if self.tags:
            tagList=self.tags.split(',')
            return tagList

#customer model 
class Customer(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE) 
    address = models.TextField(null=True)
    mobile = models.CharField(unique=True)

    def __str__(self):
        return self.user.username
#order model 
class Order(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_orders')
    order_time=models.DateTimeField(auto_now_add=True)
    order_status=models.BooleanField(default=False) 

    def __str__(self):
        return '%s' % (self.order_time)  
    
class OrderItems(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='order_items')
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    qty=models.IntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2,default=0)

    def __str__(self):
        return self.product.title

    class Meta:
        verbose_name_plural='Order Items'

#customer address model 
class CustomerAddress(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='cusotomer_addresses')
    address=models.TextField()
    default_address=models.BooleanField(default=False)

    def __str__(self):
        return self.address

    class Meta:
        verbose_name_plural='Customer Addresses'

#product rating and review 
class ProductRating(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name= 'rating_customers')
    product=models.ForeignKey(Product, on_delete=models.CASCADE, related_name="product_ratings")
    rating=models.IntegerField()
    reviews=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.reviews} - {self.rating}'


#product images
class ProductImage(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_imgs')
    image=models.ImageField(upload_to='product_imgs/',null=True)

    def __str__(self):
        return self.image.url


# wishlist
class Wishlist(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE) 
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE) 
    class Meta:
        verbose_name_plural='Wish List'

    def __str__(self):
        return f"{self.product.title} - {self.customer.user.first_name}"