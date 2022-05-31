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
			return AuthenticationFailed("User Not Found!")

		if not user.check_password(password):
			raise AuthenticationFailed("Incorrect Password")

		payload = {
		"id" : user.id,
		'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
		'iat': datetime.datetime.utcnow()
		}
		time_format = "%d/%m/%y %H:%M:%S.%f"
		timeout = str(payload['exp'])

		token = jwt.encode(payload, 'secret', algorithm='HS256')

		response = Response({"jwt_token":token,"expiration":timeout})
		response.set_cookie(key='jwt_token', value=token,httponly=True)
		response.set_cookie(key="expiration", value=timeout,httponly=True)

		return response

class UserView(APIView):

	def get(self,request):
		token = request.COOKIES.get('jwt_token')
		exp = request.COOKIES.get('expiration')

		if not token:
			return Response({"error":"Unauthenticated User"}, status=401)

		try:
			payload = jwt.decode(token, 'secret', algorithms=['HS256'])

		except (jwt.ExpiredSignatureError):
			return Response({"error":"Authentication Expired"}, status=403)

		user = User.objects.filter(id=payload['id']).first()
		serializer = UserSerializer(user)
		return Response({"user_data":serializer.data,"expiration": exp})


class LogoutView(APIView):
	def post(self,request):
		response = Response()
		response.delete_cookie('jwt_token')
		response.delete_cookie('expiration')
		response.data = {
			"logout": "successful"
		}

		return response