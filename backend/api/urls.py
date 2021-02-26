from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import (
    HelloView
)

v1_router = DefaultRouter()


urlpatterns = [
    path('v1/hello/', HelloView.as_view()),
    path('v1/', include(v1_router.urls)),
]