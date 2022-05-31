from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime
# Create your views here.

class RegisterView(APIView):
	def post(self,request):
		serializer = UserSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data)

class LoginView(APIView):
	def post(self,request):
		email = request.data['email']
		password = request.data['password']

		user = User.objects.filter(email=email).first()

		if user is None:
			raise AuthenticationFailed("User Not Found!")

		if not user.check_password(password):
			raise AuthenticationFailed("Incorrect Password")

		payload = {
		"id" : user.id,
		'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
		'iat': datetime.datetime.utcnow()
		}

		token = jwt.encode(payload, 'secret', algorithm='HS256')

		response = Response({"jwt_token":token})
		response.set_cookie(key='jwt_token', value=token,httponly=True)

		return response