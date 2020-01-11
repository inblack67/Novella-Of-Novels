// Book 
function Book(title,author,isbn)
{
this.title = title;
this.author = author;
this.isbn = isbn;
}

// UI
function UI(){}

// ========================

// Prototypes
UI.prototype.addToBookList = function(book)
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


UI.prototype.clearFields = function()
{
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

UI.prototype.alertDisplay = 
function(message, className)
{

const alertBox = document.createElement('div');
alertBox.className = `alert ${className}`;

alertBox.appendChild(document.createTextNode(message));

const container = document.querySelector('.container');

const form = document.querySelector('#book-form');

container.insertBefore(alertBox,form);

setTimeout(function(){
  document.querySelector('.alert').remove();
},3000);

}

UI.prototype.deleteBook = function(e)
{
  if(e.className === 'delete')
  {
    e.parentElement.parentElement.remove();
  } 
}


// ========================

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
    ui.alertDisplay('Book Added','success');

    ui.clearFields();
  }


  e.preventDefault();
}


// Event delegation
document.querySelector('#book-list').addEventListener('click',function(e){

  const ui = new UI();

  ui.deleteBook(e.target);

  ui.alertDisplay('Book Deleted','deletion');
});