from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required

def index_view(request):
    return render(request, 'index.html')


def signup_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm = request.POST['confirm_password']

        if password != confirm:
            messages.error(request, 'Passwords do not match')
            return redirect('user_management:signup')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken')
            return redirect('user_management:signup')

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return redirect('user_management:login')

    return render(request, 'signup.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            if user.is_superuser:
                return redirect('admin_page')
            else:
                return redirect('books:book_user_home')  
        else:
            messages.error(request, 'Invalid credentials')
            return redirect('user_management:login')
    return render(request, 'login.html')



def logout_view(request):
    logout(request)
    return redirect('index')


@login_required
def admin_home(request):
    return render(request, 'admin.html')

@login_required
def book_user_home(request):
    return render(request, 'books.html')



@login_required
def profile_view(request):
    return render(request, 'profile.html')
