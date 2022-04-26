from django.urls import path
from base.views.product_views import *

urlpatterns = [
    path('', getProducts, name="products"),
    path('<str:pk>/', getProductitem, name="products"),

]