'use strict';

$(document).ready(function(){

$('#submit').click(function (event){
 event.preventDefault();

 let users = {
   firstName: $('#firstNameInput').val(),
   lastName: $('#lastNameInput').val(),
   username: $('#usernameInput').val(),
   email: $('#emailInput').val(),
   phone: $('#phoneInput').val()
 };

  console.log(users);

    var options = {
      contentType: 'application/json',
      type: 'POST',
      url: '/messages',
      data: JSON.stringify({users})
    };

    $.ajax(options)
      .done(() => {
        console.log('DONE');
        window.location.href = '/';
      })
      .fail((err) => {
        console.log(err);
      });
  });

  $.getJSON('/users')
    .done((results) => {
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        let appendUser = {
          id: results[i].id,
          firstName: $('<h3>').text(results[i].firstname),
          lastName: $('<h3>').text(results[i].lastname),
          username: $('<h5>').text(results[i].username),
          phone: $('<h5>').text(results[i].phone),
          email: $('<h5>').text(results[i].email)
        }

        //Append all dynamically created DOM elements to users container
        $('#userContainer').append(appendUser.id);
        $('#userContainer').append(appendUser.firstName);
        $('#userContainer').append(appendUser.lastName);
        $('#userContainer').append(appendUser.username);
        $('#userContainer').append(appendUser.email);
        $('#userContainer').append(appendUser.phone);
        $('#userContainer').append('<hr />');
      }
//
//         //Create Edit and Delete buttons manually
//         var $editButton = document.createElement('button');
//         var $editMessage = document.createTextNode('Edit');
//         $editButton.setAttribute("class", "editButton");
//         $editButton.setAttribute("id", "edit"+ $id);
//         $editButton.appendChild($editMessage);
//
//         var $deleteButton = document.createElement('button');
//         var $deleteMessage = document.createTextNode('Delete');
//         $deleteButton.setAttribute("class", "deleteButton");
//         $deleteButton.setAttribute("id", "delete" + $id);
//         $deleteButton.appendChild($deleteMessage);
//
      })
// ////EDIT FUNCTIONALITY/////
//       $('.editButton').click(function(event){
//         event.preventDefault();
//
//         //hide Submit button
//         $('#submit').hide();
//
//         //Find ID of message to edit
//         var editMessage = $(this);
//
//         var editMessageID = editMessage[0].getAttribute('id').toString().substring(4);
//
//         var name = results[0].name;
//
//         var message = results[0].message;
//
//         //add the input values to form fields to edit
//         $('#nameInput').val(name);
//         $('#messageInput').val(message);
//
//         // //show hidden Update button
//         $("#update").show();
//
//         //ajax call on update button click
//         $("#update").on('click', function (event) {
//           event.preventDefault();
//
//           let newName = $('#nameInput').val();
//           console.log('newName', newName);
//
//           let newMessage = $('#messageInput').val();
//           console.log('newMessage', newMessage);
//
//           $.ajax({
//             url: `/messages/${editMessageID}`,
//             type: 'PATCH',
//             contentType: "application/json",
//             data: JSON.stringify({newName, newMessage}),
//             success: function(result) {
//               console.log('patch successful!', result);
//               window.location.href = '/';
//             },
//             fail: function(err) {
//             console.log("error");
//             console.error(err);
//             }
//           });
//         });
//       });
//
// ////DELETE FUNCTIONALITY////
//         $('.deleteButton').click(function(event) {
//           event.preventDefault();
//           // console.log("clicked");
//           var deleteMessage = $(this);
//           var deleteMessageID = deleteMessage[0].getAttribute('id').toString().substring(6);
//
//           const options = {
//             type: 'DELETE',
//             url: `/messages/${deleteMessageID}`
//           };
//
//           $.ajax(options)
//             .done(() => {
//               // console.log('DELETED!');
//               window.location.href = '/';
//             })
//             .fail((err) => {
//               console.log(err);
//             });
//         });
//     })
//     .fail(() => {
    //   $('#messageContainer').text('Could not get messages');
    // });
}); //document ready closure
