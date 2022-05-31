const trash = document.querySelectorAll(".fa-trash-can");
const approve = document.querySelectorAll(".fa-circle-check");
const approveNot = document.querySelectorAll(".fa-circle-xmark");


Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
     console.log(this.parentNode.parentNode.childNodes)
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const idea = this.parentNode.parentNode.childNodes[4].innerText
      

      fetch('deleteIdea', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'idea': idea
        })
      }) .then(data => {
        console.log(data)
        window.location.reload(true)
      })
    });
});

Array.from(approve).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(this.parentNode)

    const name = this.parentNode.parentNode.childNodes[1].innerText
    const idea = this.parentNode.parentNode.childNodes[4].innerText
    // name.classList.toggle('.green')

    fetch('idea-approved', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'idea': idea
      })
    }) .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(approveNot).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(this.parentNode)

    const name = this.parentNode.parentNode.childNodes[1].innerText
    const idea = this.parentNode.parentNode.childNodes[4].innerText
    // name.classList.toggle('.red')

    fetch('idea-notApproved', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'idea': idea
      })
    }) .then(data => { 
      console.log(data)
      window.location.reload(true)
    })
  });
});

