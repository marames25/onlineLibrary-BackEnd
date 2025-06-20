from django.shortcuts import render, redirect, get_object_or_404
from .models import Book
from .forms import BookForm
from django.db.models import Q
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import JsonResponse, HttpResponse

def is_admin(user):
    return user.is_superuser

@login_required
@user_passes_test(is_admin)
def admin_page(request):
    query = request.GET.get('q', '')
    if query:
        books = Book.objects.filter(
            Q(title__icontains=query) | Q(author__icontains=query)
        )
    else:
        books = Book.objects.all()
    add_form = BookForm()
    return render(request, 'admin.html', {
        'books': books,
        'add_form': add_form,
        'query': query,
    })

@login_required
@user_passes_test(is_admin)
def add_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            book = form.save()
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({
                    'id': book.id,
                    'title': book.title,
                    'author': book.author,
                    'description': book.description,
                    'cover_url': book.cover.url if book.cover else '/static/Imgs/default_cover.png'
                })
            return redirect('admin_page')
        elif request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'error': 'Invalid form data'}, status=400)
    return redirect('admin_page')

@login_required
@user_passes_test(is_admin)
def edit_book(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        book = get_object_or_404(Book, pk=book_id)
        form = BookForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            book = form.save()
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({
                    'id': book.id,
                    'title': book.title,
                    'author': book.author,
                    'description': book.description,
                    'cover_url': book.cover.url if book.cover else '/static/Imgs/default_cover.png'
                })
            return redirect('admin_page')
        elif request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'error': 'Invalid form data'}, status=400)
    return redirect('admin_page')

@login_required
@user_passes_test(is_admin)
def delete_book(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    if request.method == 'POST':
        book.delete()
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return HttpResponse(status=200)
    return redirect('admin_page')
