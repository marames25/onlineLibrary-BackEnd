from django.shortcuts import render, redirect, get_object_or_404
from .models import Book
from .forms import BookForm
from django.db.models import Q
from django.contrib.auth.decorators import login_required, user_passes_test


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
            form.save()
            return redirect('admin_page')
    else:
        form = BookForm()
    
    books = Book.objects.all()
    return render(request, 'admin.html', {'books': books, 'add_form': form})

@login_required
@user_passes_test(is_admin)
def edit_book(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        book = get_object_or_404(Book, pk=book_id)
        form = BookForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            form.save()
        return redirect('admin_page')
    return redirect('admin_page')

@login_required
@user_passes_test(is_admin)
def delete_book(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    if request.method == 'POST':
        book.delete()
    return redirect('admin_page')
