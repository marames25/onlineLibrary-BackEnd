from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from book_admin.models import Book
from book_user.models import FavouriteBook, BorrowedBook
from django.urls import reverse

@login_required
def books_view(request):
    query = request.GET.get('q', '')
    if query:
        books = Book.objects.filter(
            Q(title__icontains=query) | Q(author__icontains=query)
        )
    else:
        books = Book.objects.all()
    borrowed_book_ids = BorrowedBook.objects.filter(user=request.user).values_list('book_id', flat=True)
    favourite_book_ids = FavouriteBook.objects.filter(user=request.user).values_list('book_id', flat=True)

    return render(request, 'books.html', {
        'books': books,
        'borrowed_book_ids': list(borrowed_book_ids),
        'favourite_book_ids': list(favourite_book_ids),
        'query': query, 
    })


@login_required
def profile_view(request):
    query = request.GET.get('q', '')

    borrowed_books_qs = BorrowedBook.objects.filter(user=request.user).select_related('book')
    # Filter borrowed books by query if provided
    if query:
        borrowed_books_qs = borrowed_books_qs.filter(
            Q(book__title__icontains=query) | Q(book__author__icontains=query)
        )

    borrowed_books = [bb.book for bb in borrowed_books_qs]
    favourite_book_ids = FavouriteBook.objects.filter(user=request.user).values_list('book_id', flat=True)

    return render(request, 'profile.html', {
        'user': request.user,
        'borrowed_books': borrowed_books,
        'favourite_book_ids': list(favourite_book_ids),
        'query': query,
        'search_action_url': reverse('books:profile'), 
    })


@login_required
def favourites_view(request):
    query = request.GET.get('q', '')

    favourite_books_qs = FavouriteBook.objects.filter(user=request.user).select_related('book')

    if query:
        favourite_books_qs = favourite_books_qs.filter(
            Q(book__title__icontains=query) | Q(book__author__icontains=query)
        )

    favourite_books = [fb.book for fb in favourite_books_qs]
    borrowed_book_ids = BorrowedBook.objects.filter(user=request.user).values_list('book_id', flat=True)

    return render(request, 'favourites.html', {
        'favourite_books': favourite_books,
        'borrowed_book_ids': list(borrowed_book_ids),
        'query': query,
        'search_action_url': reverse('books:favourites'),
    })


@login_required
def borrow_book(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        book = get_object_or_404(Book, id=book_id)

        borrowed, created = BorrowedBook.objects.get_or_create(user=request.user, book=book)
        if not created:
            borrowed.delete()
            action = 'returned'
        else:
            action = 'borrowed'

        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({
                'success': True,
                'action': action,
                'book_id': book_id
            })
        return redirect(request.META.get('HTTP_REFERER', 'books:book_user_home'))   

@login_required
def add_favorite(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        book = get_object_or_404(Book, id=book_id)
        FavouriteBook.objects.get_or_create(user=request.user, book=book)
        return redirect(request.META.get('HTTP_REFERER', 'books:book_user_home'))

@login_required
def remove_favorite(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        book = get_object_or_404(Book, id=book_id)
        FavouriteBook.objects.filter(user=request.user, book=book).delete()
        return redirect(request.META.get('HTTP_REFERER', 'books:book_user_home'))
