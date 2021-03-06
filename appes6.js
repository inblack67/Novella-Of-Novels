// The Syntactical Sugar

class Book
{
constructor(title,author,isbn)
{
this.title = title;
this.author = author;
this.isbn = isbn;
}
}

class UI
{
constructor(){}

addToBookList(book)
{
const list = document.querySelector('#book-list');

const item = document.createElement('tr');

item.innerHTML = 
`
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a class="delete" style="color:red;text-decoration:none" href="#">X</a></td>
`

list.appendChild(item);
}

clearFields()
{
document.querySelector('#title').value = '';
document.querySelector('#author').value = '';
document.querySelector('#isbn').value = '';
}

alertDisplay(message,className)
{
const alertBox = document.createElement('div');
alertBox.className = `alert ${className}`;

alertBox.appendChild(document.createTextNode(message));

const container = document.querySelector('.container');

const form = document.querySelector('#book-form');

container.insertBefore(alertBox,form);

setTimeout(function(){
document.querySelector('.alert').remove();
},3000)
}

deleteBook(e)
{
if(e.className === 'delete')
{
e.parentElement.parentElement.remove();
} 
}
}

// local storage
class Store
{
static getBooks()
{
let books;
if(localStorage.getItem('books')===null)
{
books = [];
}
else
{
books = JSON.parse(localStorage.getItem('books'));
}

return books;
}

static addBook(book)
{
const books = Store.getBooks();
books.push(book);
localStorage.setItem('books', JSON.stringify(books));
// set it as books 
// key = books, value = "title":".."....
}

static deleteBooks(isbn)
{
  const books = Store.getBooks();
  books.forEach(function(book,index){
    if(isbn === book.isbn)
    {
      books.splice(index,1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}

static displayBooks()
{
  const books = Store.getBooks();
  books.forEach(function(book){
    const ui = new UI;
    ui.addToBookList(book);
  });
}

}

// dom loaded
document.addEventListener('DOMContentLoaded',Store.displayBooks());

// Events
document.querySelector('#book-form').addEventListener('submit',submission);


const ui = new UI()


function submission(e)
{
// selectors
const title = document.querySelector('#title').value;

const author = document.querySelector('#author').value;

const isbn = document.querySelector('#isbn').value;

const book = new Book(title,author,isbn);

if(title==='' || author==='' || isbn==='')
{
ui.alertDisplay('Data must not be incomplete','error');
}
else
{
ui.addToBookList(book);

// Adding to local storage
Store.addBook(book);

ui.alertDisplay('Book Added','success');

ui.clearFields();
}


e.preventDefault();
}


// Event delegation
document.querySelector('#book-list').addEventListener('click',function(e){

const ui = new UI();

ui.deleteBook(e.target);

// delete from ls
Store.deleteBooks(e.target.parentElement.previousElementSibling.textContent);

ui.alertDisplay('Book Deleted','deletion');
});